import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol, SettingPermisoDto, Menu } from '../models/models';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-permisos-sistema',
  templateUrl: './permisos-sistema.component.html',
  styleUrls: ['./permisos-sistema.component.css']
})
export class PermisosSistemaComponent implements OnInit {
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  roles: any = [];
  rol: any;
  myRol: any;
  menus: any = [];
  menu: Menu = new Menu();
  settingPermiso: any ;


  constructor(private after: AfterLoginServiceService,public _router:Router,public _location:Location) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';'); 
  }

  ngOnInit() {
    this.GetRol();
    this.GetMenus();
    this.SetCampos();
    this.GetPermisosPorRolyMenu();
  }

  GetRol() {
    let url = this.apiUrl + 'Seguridad/GetRolesActivos';
    this.after.GetRol(url).subscribe(data => {
      if(data){
        this.roles = data;
        this.rol = data ? data[0] : null;
      }
    });
    this.myRol = new Rol();
  }
  
  GetMenus(){
    let url = this.apiUrl + 'Seguridad/GetMenus';
    this.after.GetMenus(url).subscribe(data=>{
      if(data){
        this.menus = data;
        this.menu = data ? data[0] : null;
      }
    });
  }
  
  SetCampos(){
    let listaMenu: Menu = {
      ID: 1,
      Descripcion: 'Mantenimiento de Rol',
      Estado: 'A',
      Usuario_Creacion: 'SA',
      Usuario_Modificacion: 'SA',
      Fecha_Creacion: new Date,
      Fecha_Modificacion: new Date
    }
    let listaRol: Rol = {
      ID: 1,
      Descripcion: 'Administrador',
      Estado: 'A',
      Usuario_Creacion: 'SA',
      Usuario_Modificacion: 'SA',
      Fecha_Creacion: new Date,
      Fecha_Modificacion: new Date
    }
    this.menu = listaMenu;
    this.rol = listaRol;
  }
  GetPermisosPorRolyMenu(){
    let url = this.apiUrl + 'Seguridad/GetPermisosPorRolyMenu'
    this.after.GetPermisosPorRolyMenu(url,this.rol.ID,this.menu.ID).subscribe(data => {
      if(data){
        this.settingPermiso = data;
      }
    });
  }
  UpdatePermisosLists(){
    this.settingPermiso.Target.forEach(element => {
      element.Estado = 'A';
    });
    this.settingPermiso.Source.forEach(element => {
      element.Estado = 'I';
    });
    let url = this.apiUrl + 'Seguridad/UpdatePermisosLists';
    this.after.UpdatePermisosLists(url,this.settingPermiso).subscribe(data => {
      this.GetPermisosPorRolyMenu();
      //console.log(data);
    });

    this.refresh();
    
  }


  refresh(): void{
    this._router.navigateByUrl("/backend",{skipLocationChange:true}).then(()=>{
      this._router.navigate([decodeURI(this._location.path())])
    })
  }

}
