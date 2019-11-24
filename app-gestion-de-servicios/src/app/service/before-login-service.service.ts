import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { RespuestaCorreo } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginServiceService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return !this.Token.loggedIn();
  }
  constructor(private _http: HttpClient, private Token: TokenServiceService) { }


  EditarReporteRespuestaCorreo(apiUrl: string,data:RespuestaCorreo){
    return this._http.put(apiUrl , data);
  }
}
