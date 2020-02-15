import { Component, OnInit } from '@angular/core';
import { ServiceFactory } from 'src/services/ServiceFactory';
import { ServiceClient } from 'src/services/ServiceClient';
import { Notice } from 'src/models/Notice';
import { NoticeService } from 'src/services/NoticeService';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.less']
})
export class NoticeListComponent implements OnInit {

  pageNum:number = 1;
  pageSize:number = 10;
  total: number = 0;
  noticeList: Array<Notice>;
  keyword: string = '';

  private svc: NoticeService;
  constructor(service:NoticeService) { 
    this.svc = service;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.svc.Get({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      keyword: this.keyword,
    }).subscribe(data=>{
      this.pageNum = data.pageNumber;
      this.pageSize = data.pageSize;
      this.total = data.totalCount;
      this.noticeList = data.data;
    });
  }

  onPageEvent(pageParams){
    this.pageNum = pageParams.pageIndex+1;
    this.pageSize = pageParams.pageSize;
  }
}
