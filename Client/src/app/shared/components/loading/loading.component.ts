import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/services/LoadingService';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {

  isLoading = this.loadingSvc.isLoading;
  constructor(private loadingSvc: LoadingService) { }

  ngOnInit(): void {
  }

}
