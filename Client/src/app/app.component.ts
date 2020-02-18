import { Component } from '@angular/core';
import { MenuItem } from 'src/models/MenuItem';
import { LoadingService } from 'src/services/LoadingService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(public loadingSvc: LoadingService, private router:Router) {
  }

  title = 'XX 项目发布平台';
  year = new Date().getFullYear();

  menus: Array<MenuItem> = [
    { Title: "项目列表", Link: "/projects" },
    { Title: "通知公告", Link: "/notices" },
    { Title: "个人中心", Link: "/user/home" }
  ];
}
