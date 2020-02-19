export class UserFeedback{
    
    private _type : string;
    public get type() : string {
        return this._type;
    }
    public set type(v : string) {
        this._type = v;
    }
    
    
    private _content : string;
    public get content() : string {
        return this._content;
    }
    public set content(v : string) {
        this._content = v;
    }
    
}