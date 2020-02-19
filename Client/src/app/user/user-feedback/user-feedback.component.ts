import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserFeedback } from 'src/models/UserFeedback';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.less']
})
export class UserFeedbackComponent {

  feebackForm:FormGroup;
  feedback: UserFeedback;

  constructor(private snackBar:MatSnackBar) { 
    this.feedback = new UserFeedback();
    this.feedback.type = 'advice';

    this.feebackForm = new FormGroup(
      {
        type: new FormControl(this.feedback.type, Validators.required),
        content: new FormControl(this.feedback.content, [Validators.required, Validators.maxLength(512)])
      }
    )
  }

  submit(){
    this.snackBar.open('提交成功，感谢您的反馈', '', {
      duration: 3000
    });
  }
}
