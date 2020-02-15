import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedListData } from '../models/PagedListData';
import { ConfigService } from './ConfigService';

export class ServiceClient<TModel>{
  protected readonly apiBaseUrl;

  constructor(protected http:HttpClient,config: ConfigService, protected apiPath:string){
    this.apiBaseUrl = config.GetApiBaseUrl();
  }

  public Get(params?:object): Observable<PagedListData<TModel>> {
    let url = `${this.apiBaseUrl}/${this.apiPath}`;
    if(params && Object.keys(params).length > 0){
      url += "?";      
      for(let name of Object.keys(params)){
        url += `${name}=${params[name]}&`;
      }
    }
    return this.http.get<PagedListData<TModel>>(url);
  }

  public GetAll(): Observable<Array<TModel>> {
    return this.http.get<Array<TModel>>(`${this.apiBaseUrl}/${this.apiPath}`);
  }

  public GetDetails(id: number|string, params?: object): Observable<TModel> {
    let url = `${this.apiBaseUrl}/${this.apiPath}/${id}`;
    if(params && Object.keys(params).length > 0){
      url += "?";
      for(let name of Object.keys(params)){
        url += `${name}=${params[name]}&`;
      }
    }
    return this.http.get<TModel>(url);
  }


  public Post(model: TModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/${this.apiPath}`, model);
  }
}
