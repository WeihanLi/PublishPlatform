export class UserProfileInfo{
    
    private _userName : string;
    public get userName() : string {
        return this._userName;
    }
    public set userName(v : string) {
        this._userName = v;
    }
    
    
    private _displayName : string;
    public get displayName() : string {
        return this._displayName;
    }
    public set displayName(v : string) {
        this._displayName = v;
    }
    
    private _profileImageUrl : string;
    public get profileImageUrl() : string {
        return this._profileImageUrl;
    }
    public set profileImageUrl(v : string) {
        this._profileImageUrl = v;
    }
}