import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

// import { Observable } from 'rxjs/Observable'
import { TokenServiceService } from './token-service.service';
import { Permiso, Usuario, SettingPermisoDto, TareasEstandar, Reporte, Proyecto, EtapaProyecto } from '../models/models';
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

  GetMenus(apiUrl: string){
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
  InsertarUsuario(apiUrl: string,data:Usuario) {
    return this._http.post(apiUrl , data);
  }
  EditarUsuario(apiUrl: string,data:Usuario) {
    return this._http.put(apiUrl , data);
  }
  GetPermisosPorRolyMenu(apiUrl: string, idRol: number, idMenu: number){
    let _apimethod = `?idRol=${idRol}&idMenu=${idMenu}`;
    return this._http.get(apiUrl+_apimethod);
  }
  UpdatePermisosLists(apiUrl: string, setting: SettingPermisoDto){
    let _apimethod = ``;
    return this._http.put(apiUrl+_apimethod, setting);
  }
  
  // ---------------------------------
  // Mantenimiento de Tareas Estandar
  GetTareasEstandar(apiUrl: string){
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }
  InsertarTareaEstandar(apiUrl: string,data:TareasEstandar) {
    return this._http.post(apiUrl , data);
  }
  EditarTareaEstandar(apiUrl: string,data:TareasEstandar) {
    return this._http.put(apiUrl , data);
  }

  // ---------------------------------
  // ----Mantenimiento de Clientes----
  GetClientes(apiUrl: string){
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }

  // ----------------------------------
  // ----Mantenimiento de Proyectos----

  GetProyectos(apiUrl: string){
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }
  GetProyectosActivos(apiUrl: string){
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }
  InsertarProyecto(apiUrl: string,data:Proyecto) {
    return this._http.post(apiUrl , data);
  }
  EditarProyecto(apiUrl: string,data:Proyecto) {
    return this._http.put(apiUrl , data);
  }

  // ---------------------------------
  // ---------ETAPAS PROYECTO---------

  GetEtapasProyectoPorProyecto(apiUrl: string, idProyecto:number) {
    let _apimethod = `?idProy=${idProyecto}`;
    return this._http.get(apiUrl + _apimethod);
  }
  GetEtapasProyectoActivasPorProyecto(apiUrl: string, idProyecto:number) {
    let _apimethod = `?idProy=${idProyecto}`;
    return this._http.get(apiUrl + _apimethod);
  }  
  InsertarEtapaProyecto(apiUrl: string,data:EtapaProyecto) {
    return this._http.post(apiUrl , data);
  }
  EditarEtapaProyecto(apiUrl: string,data:EtapaProyecto) {
    return this._http.put(apiUrl , data);
  }

  // ---------------------------------
  // Mantenimiento de Reportes
  GetTipoReportes(apiUrl: string){
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }
  GetReportes(apiUrl: string){
    let _apimethod = ``;
    return this._http.get(apiUrl + _apimethod);
  }
  InsertarReporte(apiUrl: string,data:Reporte) {
    return this._http.post(apiUrl , data);
  }
}
