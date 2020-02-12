import { Injectable } from '@angular/core';
import { ServiceClient } from './ServiceClient';
import { HttpClient } from '@angular/common/http';
import { Notice } from '../models/Notice';
import { ConfigService } from './ConfigService';

@Injectable({
  providedIn: 'root'
})
export class NoticeService extends ServiceClient<Notice>{

  constructor(http: HttpClient, config: ConfigService){
    super(http, config, 'notices.json');
  }

}
