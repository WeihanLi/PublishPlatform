import { Injectable } from '@angular/core';
import { ServiceClient } from './ServiceClient';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { ConfigService } from './ConfigService';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ServiceClient<Project>{

  constructor(http: HttpClient, config: ConfigService){
    super(http, config, 'projects');
  }

}
