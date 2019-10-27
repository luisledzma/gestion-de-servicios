import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol } from '../models/models';

@Component({
  selector: 'app-mant-usuario',
  templateUrl: './mant-usuario.component.html',
  styleUrls: ['./mant-usuario.component.css']
})
export class MantUsuarioComponent implements OnInit {

  private apiUrl = environment.apiURL;
  usuarios : any;
  usuarioDetalle : Usuario = new Usuario();
  roles: any = [];
  rol: any;
  myRol: any;
  myUsr:Usuario = new Usuario();
  usuario: Usuario = new Usuario();
  _userExist: any;
  _userInfo: any;
  myMenu: any;
  menus: any;
  permisos: any;
  misPermisos: any;
  page: string = "Mantenimiento de Usuario";

  constructor(private after: AfterLoginServiceService) {
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';'); 
    this.setPermisos();
  }

  ngOnInit() {
    this.GetUsuarios();
    this.GetRol();
  }

  InsertarUsuario(){
    let url = this.apiUrl + 'Seguridad/InsertarUsuario';
    this.usuario.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarUsuario(url,this.usuario).subscribe(data => {
      this.GetUsuarios();
    })
  }

  GetUsuarios() {
    let url = this.apiUrl + 'Seguridad/GetUsuarios';
    this.after.GetUsuarios(url).subscribe(data => {
      this.usuarios = data;
    });
  }

  GetRol() {
    let url = this.apiUrl + 'Seguridad/GetRol';
    this.after.GetRol(url).subscribe(data => {
      this.roles = data;
    });
    this.rol = new Rol();
    this.myRol = new Rol();
  }

  onDetailsClick(usuario:Usuario){
    this.usuarioDetalle = usuario;
    this.GetRolPorId(usuario.Rol);
  }

  onButtonEditClick(usr:Usuario){
    this.myUsr = usr;
  }

  GetRolPorId(idRol:number) {
    let url = this.apiUrl + 'Seguridad/GetRolPorId';
    this.after.GetRolPorId(url,idRol).subscribe(data => {
      this.rol = data;
    });
  }
  onSubmit(){
    this.InsertarUsuario();
  }
  onSubmitEdit(){
    this.EditarUsuario();
  }

  EditarUsuario(){
    this.myUsr.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Seguridad/EditarUsuario';
    this.after.EditarRol(url,this.myUsr).subscribe(data => {
      this.GetRol();
    });
  }

  setPermisos() {
    this.GetMenus();
  }

  GetMenus() {
    let url = this.apiUrl + 'Seguridad/GetMenus';
    this.after.GetMenus(url).subscribe(data => {
      this.menus = data;
      this.myMenu = this.menus.filter((m) => {
        if (m.Descripcion === this.page) {
          let url2 = this.apiUrl + 'Seguridad/GetPermisosPorRolyMenu'
          this.after.GetPermisosPorRolyMenu(url2, this._userInfo[6], m.ID).subscribe(data => {
            this.permisos = data;
            this.misPermisos = this.permisos.Target;
          });
        }
      });
    });
  }

}
