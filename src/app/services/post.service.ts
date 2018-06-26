import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class PostService extends DataService {
  
  constructor(http:Http){
    super('https://jsonplaceholder.typicode.com/posts',http);
  }

}