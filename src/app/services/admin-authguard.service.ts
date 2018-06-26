import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthguardService {

  constructor(private router: Router,private service:AuthService) {

   }

   canActivate(){
     let user = this.service.currentUser;
     if(user && user.admin){
       return true;
     }
     this.router.navigate(['no-access']);
     return false;
   }


}
