import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private service: AuthService,
  private route: ActivatedRoute,private router: Router) {
  

   }
   canActivate(route,state: RouterStateSnapshot){
     if(this.service.isLoggedIn()){
       return true;
     }
     this.router.navigate(['/login'],{queryParams: {
       returnUrl: state.url
     }});
     return false;
   }

  }
