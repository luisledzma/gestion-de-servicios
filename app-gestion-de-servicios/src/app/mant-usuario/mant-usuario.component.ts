import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { ConfirmationService,MessageService } from 'primeng/api';
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
  misRoles: any;
  page: string = "Mantenimiento de Usuario";

  constructor(private after: AfterLoginServiceService,private messageService: MessageService, private confirmationService: ConfirmationService) {
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';'); 
    this.setPermisos();
  }

  ngOnInit() {
    this.GetUsuarios();
    this.GetRol();
    this.GetRoles();
  }

  GetRoles() {
    let url = this.apiUrl + 'Seguridad/GetRol?usuarioConsulta='+this._userInfo[0];
    this.after.GetRol(url).subscribe(data => {
      if(data){
        this.misRoles = data;
      }
    });
  }

  GetUsuarios() {
    let url = this.apiUrl + 'Seguridad/GetUsuarios?usuarioConsulta='+this._userInfo[0];
    this.after.GetUsuarios(url).subscribe(data => {
      if(data){
        this.usuarios = data;
      }
    });
  }

  GetRol() {
    let url = this.apiUrl + 'Seguridad/GetRolesActivos';
    this.after.GetRol(url).subscribe(data => {
      if(data){
        this.roles = data;
      }
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
  
  setPermisos() {
    this.GetMenus();
  }

  // ---------------------------------------------
  // -------------INSERTAR USUARIO----------------
  onSubmit(){
    this.confirmInsertUsuario(); // DEBE CONFIRMAR PARA INSERTAR
  }
  confirmInsertUsuario() { // ES EL DIALOG PARA CONFIRMAR
    this.confirmationService.confirm({
      message: 'Esta seguro que desea continuar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.InsertarUsuario();
      },
      reject: () => {
      }
    });
  }

  InsertarUsuario(){
    let url = this.apiUrl + 'Seguridad/InsertarUsuario';
    let urlU = this.apiUrl + 'Seguridad/ConsultarUsuarioERP';
    this.usuario.Usuario_Creacion = this._userInfo[0];
    this.after.ConsultarUsuarioERP(urlU,this.usuario.Usuario).subscribe(data => {
      if(data){
      
        this.after.InsertarUsuario(url,this.usuario).subscribe(data => {
          this.GetUsuarios();
          if(data){
            this.messageService.add({
              severity: "success",
              summary: "Correcto",
              detail: "Se ha insertado correctamente."
            });
          }
          else{
            this.messageService.add({
              severity: "error",
              summary: "Incorrecto",
              detail: "El usuario no se ha insertado correctamente."
            });
          }
        });
      }else{
        this.messageService.add({
          severity: "error",
          summary: "Usuario invalido",
          detail: "El usuario no existe en el ERP o ya existe en el sistema"
        });
      }
      
    });
    
  }

  // ----------------------------------------------------------
  // --------------------EDITAR USUARIO------------------------
  onSubmitEdit(){
    this.EditarUsuario();
  }

  EditarUsuario(){
    this.myUsr.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Seguridad/EditarUsuario';
    this.after.EditarUsuario(url,this.myUsr).subscribe(data => {
      this.GetRol();
      this.GetUsuarios();
    });
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
