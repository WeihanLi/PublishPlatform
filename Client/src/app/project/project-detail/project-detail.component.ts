import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/services/ProjectService';
import { ProjectApply } from 'src/models/ProjectApply';
import { MatDialog } from '@angular/material/dialog';
import { ProjectApplyComponent } from 'src/app/project/project-apply/project-apply.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less']
})
export class ProjectDetailComponent implements OnInit {

  projectApplied = false;
  project: Project;
  apply: ProjectApply;

  constructor(
    private route: ActivatedRoute,
    private svc: ProjectService,
    private router: Router,
    private dialog: MatDialog
  ) { 
    this.project = new Project();
    this.apply = new ProjectApply();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('projectId');
      this.svc.GetDetails(projectId)
        .subscribe(data => {
          this.project = data;
        }, err => {
          console.error(err);
          this.router.navigateByUrl('/projects');
        });
    });
  }

  applyProject(){
    const dialogRef = this.dialog.open(ProjectApplyComponent, {
      width: '360px',
      data: this.apply,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        //
        this.apply.status = 0;
        if(this.projectApplied == false){
          this.projectApplied = true;
        }
      }
    });
  }
}
