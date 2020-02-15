export class PagedListModel{

    private _pageSize : number = 10;
    public get pageSize() : number {
        return this._pageSize;
    }
    public set pageSize(v : number) {
        this._pageSize = v;
    }

    private _pageNumber : number;
    public get pageNumber() : number {
        return this._pageNumber;
    }
    public set pageNumber(v : number) {
        this._pageNumber = v;
    }

    private _count : number;
    public get count() : number {
        return this._count;
    }
    public set count(v : number) {
        this._count = v;
    }

    private _pageCount : number;
    public get pageCount() : number {
        return this._pageCount;
    }
    public set pageCount(v : number) {
        this._pageCount = v;
    }

    private _totalCount : number;
    public get totalCount() : number {
        return this._totalCount;
    }
    public set totalCount(v : number) {
        this._totalCount = v;
    }
}

export class PagedListData<T> extends PagedListModel{

  private _data : Array<T>;
  public get data() : Array<T> {
      return this._data;
  }
  public set data(v : Array<T>) {
      this._data = v;
  }
}
