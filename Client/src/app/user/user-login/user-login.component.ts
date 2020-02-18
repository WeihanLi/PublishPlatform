import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/UserService';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/services/AuthService';
import { UserProfileInfo } from 'src/models/UserProfileInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.less']
})
export class UserLoginComponent implements OnInit {
  defaultUsers = new Array<UserProfileInfo>();

  constructor(private userService:UserService, private authService: AuthService, private router: Router
    ) {
    this.InitDefaultUser();
  }

  private InitDefaultUser(){
    //
    let user1 = new UserProfileInfo();
    user1.displayName = '认证用户';
    user1.userName = 'liweihan';
    user1.profileImageUrl = 'https://upload.jianshu.io/users/upload_avatars/2432073/b68247ffda04.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240';
    this.defaultUsers.push(user1);

    let user2 = new UserProfileInfo();
    user2.displayName = '未认证用户';
    user2.userName = 'Alice';
    user2.profileImageUrl = 'https://upload.jianshu.io/users/upload_avatars/2432073/b68247ffda04.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240';
    this.defaultUsers.push(user2);
  }

  ngOnInit(): void {
  }

  login(userName:string): void{
    this.userService.login(userName)
    .subscribe(token => {
      this.authService.SetToken(token);
      // goto home page
      this.router.navigateByUrl("");
    }, err=>{
      console.group(`user ${userName} login error`);
      console.error(err);
      console.groupEnd();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          this.authService.ClearToken();
          console.log(`BadRequest， Error: ${JSON.stringify(err.error)}`);
          // redirect to verificationInfo
          this.router.navigateByUrl(`user/verification?userId=${err.error?.userId}`);
        }
      }
    });
  }
}
