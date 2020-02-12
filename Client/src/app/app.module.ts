import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material.module';
import { HttpClientModule } from '@angular/common/http';
import { NoticeDetailComponent } from './notice/notice-detail/notice-detail.component';
import { NoticeListComponent } from './notice/notice-list/notice-list.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { UserVerificationComponent } from './user/user-verification/user-verification.component';
import { UserProjectsComponent } from './user/user-projects/user-projects.component';
import { ProjectApplyComponent } from './project/project-apply/project-apply.component';
import { UserFeedbackComponent } from './user/user-feedback/user-feedback.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticeDetailComponent,
    NoticeListComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    UserVerificationComponent,
    UserProjectsComponent,
    ProjectApplyComponent,
    UserFeedbackComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
