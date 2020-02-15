export class TokenEntity{
    
    private _token : string;
    public get token() : string {
        return this._token;
    }
    public set token(v : string) {
        this._token = v;
    }
    
    private _expiresIn : number;
    public get expiresIn() : number {
        return this._expiresIn;
    }
    public set expiresIn(v : number) {
        this._expiresIn = v;
    }
}