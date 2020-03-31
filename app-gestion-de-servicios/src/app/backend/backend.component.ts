
import { Component, OnInit } from '@angular/core';
//import { TagComponents, componentes,ReturnToken } from '../../models/models';
import { Router,ActivatedRoute} from '@angular/router';
//import { WebAPIService } from 'src/app/service/web-api-service';
//import { DataService } from 'src/app/service/';
import { AuthServiceService } from '../service/auth-service.service';
import { TokenServiceService } from '../service/token-service.service';
import { MessageService } from 'primeng/api';
import { Permiso } from '../models/models';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {

  _loadData: boolean;
  tagComponents: any[] = [];
  permisos:any ;
  menus:any;
   _userExist: any;
  // _userNew:ReturnToken;
  _userInfo: any;
  rol:any;
  private apiUrl = environment.apiURL;
  public loggedIn: boolean;

  constructor(private _messageService: MessageService,private _router: Router,
              private Auth: AuthServiceService,
              private Token: TokenServiceService, 
              private _route: ActivatedRoute,
              private after: AfterLoginServiceService) { 

                const us = localStorage.getItem('User').split('.')[1];  
                this._userExist = JSON.parse(atob(us));
                //console.log(this._userExist.unique_name.split(';'));
                this._userInfo = this._userExist.unique_name.split(';');
                
 
              }

  ngOnInit() {
    
    this.GetRolPorId(this._userInfo[6]);
    
    var urlParams = [];
    window.location.search.replace("?", "").split("&").forEach(function (e, i) {
        var p = e.split("=");
        urlParams[p[0]] = p[1];
    });

    //console.log(urlParams["loaded"]);

    if(urlParams["loaded"]) {}else{

        let win = (window as any);
        win.location.search = '?loaded=1';
        //win.location.reload('?loaded=1');
    }
    
    this.GetPermisosPorRol(this._userInfo[6]);
    this.GetMenusPorRol(this._userInfo[6]);

  }


  GetPermisosPorRol(rol: number) {
    let url = this.apiUrl + 'Permiso/GetPermisosPorRol';
    this.after.GetPermisosPorRol(url, rol).subscribe(data => {
      this.permisos = data;
    });

  }

  GetMenusPorRol(rol: number) {
    let url = this.apiUrl + 'Permiso/GetMenusPorRol';
    this.after.GetMenusPorRol(url, rol).subscribe(data => {
      
      this.menus = data;
      //console.log(this.menus);
    });

  }

  GetRolPorId(idRol:number) {
    let url = this.apiUrl + 'Seguridad/GetRolPorId';
    this.after.GetRolPorId(url,idRol).subscribe(data => {
      this.rol = data;
    });
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this._router.navigateByUrl('/login');
    localStorage.clear();
  }


}
