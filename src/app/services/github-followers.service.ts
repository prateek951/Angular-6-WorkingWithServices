import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GithubFollowersService extends DataService{
 
  constructor(http:Http) {
    super('https://api.github.com/users/amitsrivastava4all/followers',http)
   }
}
