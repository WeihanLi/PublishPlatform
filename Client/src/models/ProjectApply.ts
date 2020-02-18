export class ProjectApply{
    
    private _projectId : string;
    public get projectId() : string {
        return this._projectId;
    }
    public set projectId(v : string) {
        this._projectId = v;
    }
    
    
    private _userId : string;
    public get userId() : string {
        return this._userId;
    }
    public set userId(v : string) {
        this._userId = v;
    }
    
    
    private _status : number;
    public get status() : number {
        return this._status;
    }
    public set status(v : number) {
        this._status = v;
    }

    
    private _advantages : string;
    public get advantages() : string {
        return this._advantages;
    }
    public set advantages(v : string) {
        this._advantages = v;
    }
    
    private _price : number;
    public get price() : number {
        return this._price;
    }
    public set price(v : number) {
        this._price = v;
    }
    
    
    private _extra : string;
    public get extra() : string {
        return this._extra;
    }
    public set extra(v : string) {
        this._extra = v;
    }
    
}