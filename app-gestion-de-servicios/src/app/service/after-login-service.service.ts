import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

// import { Observable } from 'rxjs/Observable'
import { TokenServiceService } from './token-service.service';
import { Permiso } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginServiceService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.Token.loggedIn();
  }
  // tslint:disable-next-line: deprecation
  constructor(private _http: HttpClient, private Token: TokenServiceService) { }

  GetPermisosPorRol(apiUrl: string, idRol: number) {
    let _apimethod = `?idRol=${idRol}`;
    return this._http.get(apiUrl + _apimethod);
  }
  GetMenusPorRol(apiUrl: string, idRol: number) {
    let _apimethod = `?idRol=${idRol}`;
    return this._http.get(apiUrl + _apimethod);
  }

  GetRol(apiUrl: string) {
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }

  GetRolPorId(apiUrl: string, idRol:number) {
    let _apimethod = `?idRol=${idRol}`;
    return this._http.get(apiUrl + _apimethod);
  }


  InsertarRol(apiUrl: string,data) {
    return this._http.post(apiUrl , data);
  }

  EditarRol(apiUrl: string,data) {
    return this._http.put(apiUrl , data);
  }

  GetUsuarios(apiUrl: string) {
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }

}
