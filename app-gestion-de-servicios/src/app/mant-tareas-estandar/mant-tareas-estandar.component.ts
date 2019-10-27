import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol, TareasEstandar } from '../models/models';

@Component({
  selector: 'app-mant-tareas-estandar',
  templateUrl: './mant-tareas-estandar.component.html',
  styleUrls: ['./mant-tareas-estandar.component.css']
})
export class MantTareasEstandarComponent implements OnInit {
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  tareasEstandar: any;
  tarea: TareasEstandar = new TareasEstandar();
  selectedTarea: TareasEstandar = new TareasEstandar();

  constructor(private after: AfterLoginServiceService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
  }

  ngOnInit() {
    this.GetTareasEstandar();
  }
  
  GetTareasEstandar() {
    let url = this.apiUrl + 'Administracion/GetTareasEstandar';
    this.after.GetTareasEstandar(url).subscribe(data => {
      this.tareasEstandar = data;
    });
  }

  onSubmit(){
    this.InsertarTareaEstandar();
  }
  
  InsertarTareaEstandar() {
    let url = this.apiUrl + 'Administracion/InsertarTareaEstandar';
    this.tarea.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarTareaEstandar(url,this.tarea).subscribe(data => {
      //console.log(data)
      this.GetTareasEstandar();
    });
    this.tarea = new TareasEstandar();
  }

  onButtonEditClick(tarea:TareasEstandar){
    this.selectedTarea = tarea;
  }
  
  onSubmitEdit(){
    console.log('EntraAqui');
    this.EditarTareaEstandar();
  }

  EditarTareaEstandar() {
    let url = this.apiUrl + 'Administracion/EditarTareaEstandar';
    this.selectedTarea.Usuario_Modificacion = this._userInfo[0];
    this.after.EditarTareaEstandar(url,this.selectedTarea).subscribe(data => {
      //console.log(data)
      this.GetTareasEstandar();
    });

  }
}
