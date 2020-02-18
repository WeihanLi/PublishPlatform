import { ServiceClient } from './ServiceClient';
import { VerificationInfo } from 'src/models/VerificationInfo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './ConfigService';
import { Observable } from 'rxjs';
import { TokenEntity } from 'src/models/TokenEntity';
import { UserProfileInfo } from 'src/models/UserProfileInfo';


@Injectable({
    providedIn: 'root'
})
export class UserService extends ServiceClient<VerificationInfo>{
    constructor(http: HttpClient, config: ConfigService){
        super(http, config, 'account');
    }

    public login(userName:string):Observable<TokenEntity>{
        return this.http.post<TokenEntity>(`${this.apiBaseUrl}/${this.apiPath}/login`, { userName: userName });
    }

    public getVerificationInfo(userId?: string): Observable<VerificationInfo>{
        let url = `${this.apiBaseUrl}/${this.apiPath}/verification`;
        if(userId){
            url = `${url}?userId=${userId}`;
        }
        return this.http.get<VerificationInfo>(url);
    }

    public updateVerificationInfo(info: VerificationInfo): Observable<VerificationInfo>{
        let url = `${this.apiBaseUrl}/${this.apiPath}/verification`;
        return this.http.put<VerificationInfo>(url, info);
    }

    public getProfileInfo(): Observable<UserProfileInfo>{
        let url = `${this.apiBaseUrl}/${this.apiPath}/profile`;
        return this.http.get<UserProfileInfo>(url);
    }
    
    public updateProfileInfo(profileInfo: UserProfileInfo): Observable<UserProfileInfo>{
        let url = `${this.apiBaseUrl}/${this.apiPath}/profile`;
        return this.http.put<UserProfileInfo>(url, profileInfo);
    }
}