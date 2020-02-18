import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/services/ProjectService';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less']
})
export class ProjectDetailComponent implements OnInit {

  projectApplied = false;
  project: Project;
  apply:any;

  constructor(
    private route: ActivatedRoute,
    private svc: ProjectService,
    private router: Router
  ) { 
    this.project = new Project();
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
}
