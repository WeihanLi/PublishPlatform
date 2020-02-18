export class VerificationInfo{
    private _realName : string;
    public get realName() : string {
        return this._realName;
    }
    public set realName(v : string) {
        this._realName = v;
    }
    
    private _phoneNumber : string;
    public get phoneNumber() : string {
        return this._phoneNumber;
    }
    public set phoneNumber(v : string) {
        this._phoneNumber = v;
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

    
    private _status : number;
    public get status() : number {
        return this._status;
    }
    public set status(v : number) {
        this._status = v;
    }

    
    private _remark : string;
    public get remark() : string {
        return this._remark;
    }
    public set remark(v : string) {
        this._remark = v;
    }
    
}