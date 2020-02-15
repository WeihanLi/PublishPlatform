import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { LoadingService } from 'src/services/LoadingService';

@Injectable()
export class LoadingInteceptor implements HttpInterceptor {
  constructor(private loadingSvc: LoadingService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSvc.show();
    return next.handle(request).pipe(
      finalize(()=>this.loadingSvc.hide())
    );
  }
}