import { Component, OnInit } from '@angular/core';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css']
})
export class GarantiasComponent implements OnInit {
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  myMenu: any;
  menus: any;
  permisos: any;
  misPermisos: any;
  page: string = "Garantías";
  garantias:any;

  constructor(private after: AfterLoginServiceService,) {
    const us = localStorage.getItem('User').split('.')[1];
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
    this.setPermisos();
   }

  ngOnInit() {
    this.GetGarantias();
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

  GetGarantias() {
    let url = this.apiUrl + 'Administracion/GetGarantias';
    this.after.GetGarantias(url).subscribe(data => {
      this.garantias = data;
    });
  }

}
