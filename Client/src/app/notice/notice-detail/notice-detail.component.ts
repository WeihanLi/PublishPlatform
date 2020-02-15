import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeService } from 'src/services/NoticeService';
import { Notice } from 'src/models/Notice';
import { LoadingService } from 'src/services/LoadingService';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.less']
})
export class NoticeDetailComponent implements OnInit {

  notice: Notice;
  constructor(
    private route: ActivatedRoute,
    private svc: NoticeService,
    public loadingSvc: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const noticePath = params.get('noticePath');
      this.svc.GetDetails(noticePath)
        .subscribe(data => {
          this.notice = data;
        }, err => {
          console.error(err);
          this.router.navigateByUrl('/notices');
        });
    });
  }
}
