import { ServiceClient } from './ServiceClient';
import { VerificationInfo } from 'src/models/VerificationInfo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './ConfigService';
import { Observable } from 'rxjs';
import { TokenEntity } from 'src/models/TokenEntity';


@Injectable({
    providedIn: 'root'
})
export class UserService extends ServiceClient<VerificationInfo>{
    constructor(http: HttpClient, config: ConfigService){
        super(http, config, 'account');
    }

    public login(userName:string):Observable<TokenEntity>{
        // error handle
        return this.http.post<TokenEntity>(`${this.apiBaseUrl}/${this.apiPath}/login`, { userName: userName });
    }
}