import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Rol } from '../models/models';

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
  roles : any
  myRol : Rol = new Rol();
  _userExist: any;
  _userInfo: any;
  constructor(
    private after: AfterLoginServiceService
  ) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';'); 
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

  

  InsertarRol(){
    let url = this.apiUrl + 'Seguridad/InsertarRol';
    this.rol.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarRol(url,this.rol).subscribe(data => {
      //console.log(data)
      this.GetRol();
    })
    
  }

  onButtonEditClick(rol:Rol){
    this.myRol = rol;
  }

  onSubmit(){
    this.InsertarRol();
  }

  onSubmitEdit(){
    this.EditarRol();
  }

  EditarRol(){
    this.myRol.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Seguridad/EditarRol';
    this.after.EditarRol(url,this.myRol).subscribe(data => {
      console.log(data)
      this.GetRol();
    })
  }
}
