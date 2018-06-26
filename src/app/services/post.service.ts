import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http:Http) { }
  
  createPost(post){
    return this.http.post(this.url,JSON.stringify(post))
    .catch(this.handleError);
  }
  updatePost(post){
    return this.http.patch(this.url+'/'+post.id,
  JSON.stringify({isRead: true}))
  .catch(this.handleError);
  }
  deletePost(post){
    return this.http.delete(this.url+'/'+post.id)
    .catch(this.handleError);
  }
  getPosts(){
   return this.http.get(this.url).catch(this.handleError);
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