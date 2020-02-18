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
import { UserLoginComponent } from './user/user-login/user-login.component';

import { AuthGuard } from 'src/interceptors/AuthGuard';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
  
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'projects/:projectId', component: ProjectDetailComponent, canActivate: [AuthGuard] },
 
  { path: 'notices', component: NoticeListComponent, canActivate: [AuthGuard] },
  { path: 'notices/:noticePath', component: NoticeDetailComponent, canActivate: [AuthGuard] },

  { path: 'user/home', component: UserHomeComponent },
  { path: 'user/projects', component: UserProjectsComponent, canActivate: [AuthGuard] },
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/feedback', component: UserFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/verification', component: UserVerificationComponent },
  { path: 'user/login', component: UserLoginComponent },
  
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
