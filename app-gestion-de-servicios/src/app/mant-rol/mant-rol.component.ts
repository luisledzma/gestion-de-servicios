import { Component, OnInit, ɵConsole } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Rol } from '../models/models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mant-rol',
  templateUrl: './mant-rol.component.html',
  styleUrls: ['./mant-rol.component.css']
})
export class MantRolComponent implements OnInit {
  public form = {
    Descripcion: null,
    Estado: null
  };
  rol: Rol = new Rol();
  private apiUrl = environment.apiURL;
  roles: any
  myRol: Rol = new Rol();
  _userExist: any;
  _userInfo: any;
  myMenu: any;
  menus: any;
  permisos: any;
  misPermisos: any;
  page: string = "Mantenimiento de Rol";
  constructor(
    private after: AfterLoginServiceService,
  ) {
    const us = localStorage.getItem('User').split('.')[1];
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
    this.setPermisos();
  }

  ngOnInit() {
    this.GetRol();
  }


  GetRol() {
    let url = this.apiUrl + 'Seguridad/GetRol';
    this.after.GetRol(url).subscribe(data => {
      this.roles = data;
    });
    this.rol = new Rol();
    this.myRol = new Rol();
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


  InsertarRol() {
    let url = this.apiUrl + 'Seguridad/InsertarRol';
    this.rol.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarRol(url, this.rol).subscribe(data => {
      //console.log(data)
      this.GetRol();
    })

  }

  onButtonEditClick(rol: Rol) {
    this.myRol = rol;
  }

  onSubmit() {
    this.InsertarRol();
  }

  onSubmitEdit() {
    this.EditarRol();
  }

  EditarRol() {
    this.myRol.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Seguridad/EditarRol';
    this.after.EditarRol(url, this.myRol).subscribe(data => {
      //console.log(data)
      this.GetRol();
    })
  }
}
