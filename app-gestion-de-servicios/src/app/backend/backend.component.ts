
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
    
    // JSON.parse(localStorage.getItem('PacienteUser'));
    //   this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    //    //console.log(this._userExist);
    //   this.getComponents();


    // }
    // else if(this._userNew!=null){


    //   this._userInfo = this._userNew;//JSON.parse(localStorage.getItem('newUser'));
    //   this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    //  // console.log(this._userNew);
    //   this.getComponents();
    // }

    // localStorage.setItem('UserLogin', JSON.stringify(this._userInfo));
    
    //console.log(this.apiUrl);
    this.GetPermisosPorRol(this._userInfo[6]);
    this.GetMenusPorRol(this._userInfo[6]);
  }


  GetPermisosPorRol(rol: number) {
    // this._loadData=false;
    // this._WebAPIService.GetComponents(2).subscribe(data => {
    // this.tagComponents=data;
    // this._DataService.changeMenuDetails(this.tagComponents); // Set in Service
    // });
    let url = this.apiUrl + 'Permiso/GetPermisosPorRol';
    this.after.GetPermisosPorRol(url, rol).subscribe(data => {
      
      this.permisos = data;
      //console.log(this.permisos);
    });

  }

  GetMenusPorRol(rol: number) {
    // this._loadData=false;
    // this._WebAPIService.GetComponents(2).subscribe(data => {
    // this.tagComponents=data;
    // this._DataService.changeMenuDetails(this.tagComponents); // Set in Service
    // });
    let url = this.apiUrl + 'Permiso/GetMenusPorRol';
    this.after.GetMenusPorRol(url, rol).subscribe(data => {
      
      this.menus = data;
      //console.log(this.permisos);
    });

  }



  // actionMenu()
  // {
  //   this._ActionMenu = !this._ActionMenu;
  // }

  // checkRoute()
  // {
  //   try{
  //     let route: string = localStorage.getItem('routeLink');
  //     localStorage.removeItem("routeLink");

  //     if(route)
  //       this._router.navigate(['/PacienteBackend/' + route ]);

  //   }catch{
  //     //this.logout();
  //   }

  // }



  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this._router.navigateByUrl('/login');
    localStorage.clear();
  }


}
