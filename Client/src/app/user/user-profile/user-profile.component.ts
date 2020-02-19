import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/UserService';
import { UserProfileInfo } from 'src/models/UserProfileInfo';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  profileInfo: UserProfileInfo;
  constructor(private svc:UserService) {
    this.profileInfo = new UserProfileInfo();
   }

  ngOnInit(): void {
    this.svc.getProfileInfo()
    .subscribe(data=>{
      this.profileInfo = data;
    })
  }

  changeAvator(){
    document.getElementById("avatorInput").click();
  }
}
