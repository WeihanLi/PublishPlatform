import { ProjectStatus } from './ProjectStatus';

export class Project{
    
    private _id : string;
    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(v : string) {
        this._description = v;
    }
    
    private _status : ProjectStatus;
    public get status() : ProjectStatus {
        return this._status;
    }
    public set status(v : ProjectStatus) {
        this._status = v;
    }
    
    
    private _publishedAt : Date;
    public get publishedAt() : Date {
        return this._publishedAt;
    }
    public set publishedAt(v : Date) {
        this._publishedAt = v;
    }
    
    
    private _begin : Date;
    public get begin() : Date {
        return this._begin;
    }
    public set begin(v : Date) {
        this._begin = v;
    }
    
    
    private _end : Date;
    public get end() : Date {
        return this._end;
    }
    public set end(v : Date) {
        this._end = v;
    }
    
    
    private _extra : string;
    public get extra() : string {
        return this._extra;
    }
    public set extra(v : string) {
        this._extra = v;
    }
}