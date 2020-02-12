import { ProjectStatus } from './ProjectStatus';

export class Project{
    
    private _projectId : string;
    public get projectId() : string {
        return this._projectId;
    }
    public set projectId(v : string) {
        this._projectId = v;
    }
    
    
    private _projectName : string;
    public get projectName() : string {
        return this._projectName;
    }
    public set projectName(v : string) {
        this._projectName = v;
    }
    

    
    private _projectDescription : string;
    public get projectDescription() : string {
        return this._projectDescription;
    }
    public set projectDescription(v : string) {
        this._projectDescription = v;
    }
    
    private _projectStatus : ProjectStatus;
    public get projectStatus() : ProjectStatus {
        return this._projectStatus;
    }
    public set projectStatus(v : ProjectStatus) {
        this._projectStatus = v;
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