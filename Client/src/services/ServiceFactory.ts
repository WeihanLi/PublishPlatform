
import { Injectable } from '@angular/core';
import { ServiceClient } from './ServiceClient';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './ConfigService';

@Injectable({
    providedIn: 'root'
})
export class ServiceFactory {

    constructor(private http: HttpClient, private config: ConfigService) {
    }

    public GetService<T>(path: string): ServiceClient<T> {
        return new ServiceClient<T>(this.http, this.config, path);
    }
}