import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectApply } from 'src/models/ProjectApply';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-apply',
  templateUrl: './project-apply.component.html',
  styleUrls: ['./project-apply.component.less']
})
export class ProjectApplyComponent {

  constructor(
    public dialogRef: MatDialogRef<ProjectApplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectApply, private snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitApply() {
    this.snackBar.open('申请成功，请耐心等待审核', '', {
      duration: 3000
    });
  }
}
