import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/services/ProjectService';
import { ColumnInfo } from 'src/models/ColumnInfo';
import { Project } from 'src/models/Project';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.less']
})
export class UserProjectsComponent implements OnInit {

  pageNum:number = 1;
  pageSize:number = 10;
  total: number = 0;
  list: Array<Project>;
  keyword: string = '';
  
  columns: Array<ColumnInfo> = [
    { 
      ColumnName: 'name',
      DisplayName: "项目名称" 
    },
    { 
      ColumnName: 'begin',
      DisplayName: "招标开始时间" 
    }, 
    { 
      ColumnName: 'end',
      DisplayName: "招标结束时间" 
    },
    { 
      ColumnName: 'publishedAt',
      DisplayName: "发布时间" 
    },
    { 
      ColumnName: 'status',
      DisplayName: "项目状态" 
    }
  ];

  displayedColumns: Array<string>;

  constructor(private svc:ProjectService) { 
    this.displayedColumns = this.columns.map(c=>c.ColumnName);
  }

  ngOnInit(): void {
    this.loadData(1, 10);
  }

  loadData(pageNum:number=1, pageSize: number=10){
    this.svc.Get({
      pageNum: pageNum > 0 ? pageNum : 1,
      pageSize: pageSize > 0 ? pageSize : 10,
      keyword: this.keyword,
    }).subscribe(data => {
      this.pageNum = data.pageNumber;
      this.pageSize = data.pageSize;
      this.total = data.totalCount;
      this.list = data.data;
    });
  }

  onPageEvent(pageParams){
    this.loadData(pageParams.pageIndex+1, pageParams.pageSize);
  }
}
