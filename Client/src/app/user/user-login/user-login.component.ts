import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/UserService';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/services/AuthService';
import { UserProfileInfo } from 'src/models/UserProfileInfo';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.less']
})
export class UserLoginComponent implements OnInit {
  defaultUsers = new Array<UserProfileInfo>();

  constructor(private userService:UserService, private authService: AuthService) { 
    this.InitDefaultUser();
  }

  private InitDefaultUser(){
    //
    let user1 = new UserProfileInfo();
    user1.displayName = 'UserA';
    user1.userName = 'liweihan';
    user1.profileImageUrl = 'https://upload.jianshu.io/users/upload_avatars/2432073/b68247ffda04.jpg';
    this.defaultUsers.push(user1);

    let user2 = new UserProfileInfo();
    user2.displayName = 'UserB';
    user2.userName = 'Alice';
    user2.profileImageUrl = 'https://upload.jianshu.io/users/upload_avatars/2432073/b68247ffda04.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240';
    this.defaultUsers.push(user2);
  }

  ngOnInit(): void {
  }

  login(userName:string): void{
    this.userService.login(userName)
    .subscribe(token => {
      if(token){
        this.authService.SetToken(token);
      }
    }, err=>{
      console.group(`user ${userName} login error`);
      console.error(err);
      console.groupEnd();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          console.log(`BadRequest， Error: ${JSON.stringify(err.error)}`);
          // redirect
          // or show a modal
        }
      }
    });
  }
}
