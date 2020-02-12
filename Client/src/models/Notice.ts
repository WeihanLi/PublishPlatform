export class Notice{
    
    private _title : string;
    public get title() : string {
        return this._title;
    }
    public set title(v : string) {
        this._title = v;
    }    
    
    private _detail : string;
    public get detail() : string {
        return this._detail;
    }
    public set detail(v : string) {
        this._detail = v;
    }
    
    private _publishedAt : Date;
    public get publishedAt() : Date {
        return this._publishedAt;
    }
    public set publishedAt(v : Date) {
        this._publishedAt = v;
    }

    private _viewCount : number;
    public get viewCount() : number {
        return this._viewCount;
    }
    public set viewCount(v : number) {
        this._viewCount = v;
    }
    
}