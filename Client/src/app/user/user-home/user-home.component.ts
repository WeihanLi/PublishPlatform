import { Component, OnInit } from '@angular/core';
import { UserProfileInfo } from 'src/models/UserProfileInfo';
import { UserService } from 'src/services/UserService';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.less']
})
export class UserHomeComponent implements OnInit {

  user:UserProfileInfo;
  constructor(private svc: UserService) { 
    this.user = new UserProfileInfo();
  }

  ngOnInit(): void {
    this.svc.getProfileInfo()
    .subscribe(data => {
      this.user = data;
    });
  }

}
