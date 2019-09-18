import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

//import { Observable } from 'rxjs/Observable'
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginServiceService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.Token.loggedIn();
}

  constructor(private Token: TokenServiceService) { }
}
