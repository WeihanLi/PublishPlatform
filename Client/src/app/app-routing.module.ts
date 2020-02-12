import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticeDetailComponent } from './notice/notice-detail/notice-detail.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { NoticeListComponent } from './notice/notice-list/notice-list.component';
import { UserProjectsComponent } from './user/user-projects/user-projects.component';
import { UserVerificationComponent } from './user/user-verification/user-verification.component';
import { UserFeedbackComponent } from './user/user-feedback/user-feedback.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:projectName', component: ProjectDetailComponent },
  
  { path: 'notices', component: NoticeListComponent },
  { path: 'notices/:noticePath', component: NoticeDetailComponent },

  { path: 'user/home', component: UserHomeComponent },
  { path: 'user/projects', component: UserProjectsComponent },
  { path: 'user/verification', component: UserVerificationComponent },
  { path: 'user/feedback', component: UserFeedbackComponent },
  
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
