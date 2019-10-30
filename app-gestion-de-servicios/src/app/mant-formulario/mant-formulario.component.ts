import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol, TareasEstandar, Reporte, ClienteC, TipoReporte } from '../models/models';

@Component({
  selector: 'app-mant-formulario',
  templateUrl: './mant-formulario.component.html',
  styleUrls: ['./mant-formulario.component.css']
})
export class MantFormularioComponent implements OnInit {
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  reportes: any;
  reporte: Reporte = new Reporte(); // Para insertar
  selectedReporte: Reporte = new Reporte(); // Para editar
  clientes: any;
  selectedCliente: ClienteC = new ClienteC();
  tiposReportes: any;
  selectedTReporte: TipoReporte = new TipoReporte();
  tareasEstandar: any;
  selectedTarea: TareasEstandar = new TareasEstandar();
  horaInicio: string;
  horaFinal: string;

  constructor(private after: AfterLoginServiceService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
  }

  ngOnInit() {
    this.GetReportes();
    this.GetClientes();
    this.GetTareasEstandar();
    this.GetTipoReportes();
  }
  
  GetReportes() {
    let url = this.apiUrl + 'Administracion/GetReportes';
    this.after.GetReportes(url).subscribe(data => {
      this.reportes = data;
      console.log(data);
    });
  }
  GetClientes(){
    let url = this.apiUrl + 'Administracion/GetClientes';
    this.after.GetClientes(url).subscribe(data => {
      this.clientes = data;
      this.selectedCliente = data ? data[0] : undefined;
      console.log(data);
    });
  }
  GetTareasEstandar() {
    let url = this.apiUrl + 'Administracion/GetTareasEstandar';
    this.after.GetTareasEstandar(url).subscribe(data => {
      this.tareasEstandar = data;
      this.selectedTarea = data ? data[0] : undefined;
    });
  }
  GetTipoReportes(){
    let url = this.apiUrl + 'Administracion/GetTipoReportes';
    this.after.GetTipoReportes(url).subscribe(data => {
      this.tiposReportes = data;
      this.selectedTReporte = data ? data[0] : undefined;
      console.log(data);
    });
  }

  onSubmit(){
    this.InsertarReporte();
  }

  InsertarReporte() {
    let url = this.apiUrl + 'Administracion/InsertarReporte';
    this.reporte.Usuario_Creacion = this._userInfo[0];
    this.reporte.ID_Tipo_Reporte = this.selectedTReporte.ID;
    this.reporte.ID_Cliente = this.selectedCliente.ID;
    this.reporte.ID_Tareas_Estandar = this.selectedTarea.ID;
    this.after.InsertarReporte(url,this.reporte).subscribe(data => {
      //console.log(data)
      this.GetReportes();
    });
    this.reporte = new Reporte();
  }
}
