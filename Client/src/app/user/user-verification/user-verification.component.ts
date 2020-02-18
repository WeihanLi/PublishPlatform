import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/UserService';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';
import { VerificationInfo } from 'src/models/VerificationInfo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.less']
})
export class UserVerificationComponent implements OnInit {

  verificationInfo:VerificationInfo;
  isAuthenticated:boolean;
  verificationForm: FormGroup;


  constructor(private route: ActivatedRoute,
    private svc: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    authSvc: AuthService,
    ) { 
      this.verificationInfo = new VerificationInfo();
      this.isAuthenticated = authSvc.IsAuthenticated();

      this.verificationForm = new FormGroup({
        realName: new FormControl(this.verificationInfo.realName, [Validators.required, Validators.maxLength(4)]),
        phoneNumber: new FormControl(this.verificationInfo.phoneNumber, [Validators.required, Validators.pattern('^1[3-9]\\d{9}$')]),
        companyName: new FormControl(this.verificationInfo.companyName, [Validators.required, Validators.maxLength(64)]),
        companyDesc: new FormControl(this.verificationInfo.extra, [Validators.required, Validators.maxLength(2000)]),
      });
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let userId = params.get('userId');
      if(!this.isAuthenticated && !userId){
        // invalid request
        this.router.navigateByUrl('user/login');
      }else{
        this.svc.getVerificationInfo(userId)
        .subscribe(data=>{
          this.verificationInfo = data;
        }, err=> {
          this.router.navigateByUrl('user/login');
        });
      }
    });
  }

  submit(){
    this.snackBar.open('信息提交成功，请耐心等待审核', '', { duration: 3000 });
  }
}
