export class VerificationInfo{
    private _realName : string;
    public get realName() : string {
        return this._realName;
    }
    public set realName(v : string) {
        this._realName = v;
    }
    
    private _phone : string;
    public get phone() : string {
        return this._phone;
    }
    public set phone(v : string) {
        this._phone = v;
    }
    
    
    private _companyName : string;
    public get companyName() : string {
        return this._companyName;
    }
    public set companyName(v : string) {
        this._companyName = v;
    }
    
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(v : string) {
        this._description = v;
    }
    
    private _extra : string;
    public get extra() : string {
        return this._extra;
    }
    public set extra(v : string) {
        this._extra = v;
    }
}