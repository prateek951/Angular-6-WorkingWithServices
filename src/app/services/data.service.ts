import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url:string,private http:Http) { }
  
  create(resource){
    return this.http.post(this.url,JSON.stringify(resource))
    .map(response => response.json()).catch(this.handleError);
  }
  update(resource){
    return this.http.patch(this.url+'/'+resource.id,
  JSON.stringify({isRead: true}))
  .map(response => response.json())
  .catch(this.handleError);
  }
  delete(resource){
    return this.http.delete(this.url+'/'+resource.id)
    .map(response => response.json())
    .catch(this.handleError);
  }
  getAll(){
   return this.http.get(this.url)
        .map((response: Response)=> response.json())
        .catch(this.handleError);
  }

private handleError(error:Response){
  if(error.status === 400){
    return Observable.throw(new BadRequestError(error.json()));
  }
  if(error.status === 404){
    return Observable.throw(new NotFoundError());
  }else{
    return Observable.throw(new AppError(error));
  }
}
}