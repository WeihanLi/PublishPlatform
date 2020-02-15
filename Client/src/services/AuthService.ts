import { TokenEntity } from 'src/models/TokenEntity';
import { Injectable } from '@angular/core';

const TokenCacheName = "UserToken";
const TokenExpiresAtCacheName = "TokenExpiresAt";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    public GetToken(): string{
        let expiresAt = Number.parseInt(localStorage.getItem(TokenExpiresAtCacheName));
        let token:string= '';
        if(Number.isNaN(expiresAt) === false){
            token = localStorage.getItem(TokenCacheName);
        }
        if(expiresAt < new Date().getTime()){
            localStorage.removeItem(TokenCacheName);
            return '';
        }
        return token;
    }

    public SetToken(token: TokenEntity){
        if(token && token.token){
            let expiresAt = (new Date().getTime() + token.expiresIn * 1000);
            localStorage.setItem(TokenExpiresAtCacheName, expiresAt.toString());
            localStorage.setItem(TokenCacheName, token.token);
        }
    }

    public IsAuthenticated():boolean {
        return this.GetToken() != '';
    }
}