import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol, TareasEstandar, Reporte, ClienteC, TipoReporte, Proyecto, EtapaProyecto } from '../models/models';

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
  horaInicio: Date;
  horaFinal: Date;

  
  // ----------------------------------
  proyectos: any;
  selectedProyecto: Proyecto = new Proyecto(); //Para Editar
  // ------------------------------------
  // ---------------ETAPAS---------------
  etapas: any;
  selectedEtapa: EtapaProyecto = new EtapaProyecto();

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
    this.GetProyectosActivos();
    this.GetEtapasProyectoActivasPorProyecto(0);
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

  GetEtapasProyectoPorProyecto(id:number){
    if(this.selectedProyecto.ID != 0){
      let url = this.apiUrl + 'Administracion/GetEtapasProyectoPorProyecto';
      this.after.GetEtapasProyectoPorProyecto(url,id).subscribe(data => {
        this.etapas = data;
        this.selectedEtapa = data ? data[0] : undefined;
      });
    }
  }
  GetEtapasProyectoActivasPorProyecto(id:number){
    if(this.selectedProyecto.ID != 0){
      let url = this.apiUrl + 'Administracion/GetEtapasProyectoActivasPorProyecto';
      this.after.GetEtapasProyectoActivasPorProyecto(url,id).subscribe(data => {
        this.etapas = data;
        this.selectedEtapa = data ? data[0] : undefined;
      });
    }
  }
  GetProyectos(){
    let url = this.apiUrl + 'Administracion/GetProyectos';
    this.after.GetProyectos(url).subscribe(data => {
      this.proyectos = data;
      this.selectedProyecto = data ? data[0] : undefined;
      console.log(data);
    });
  }
  GetProyectosActivos(){
    let url = this.apiUrl + 'Administracion/GetProyectosActivos';
    this.after.GetProyectosActivos(url).subscribe(data => {
      this.proyectos = data;
      this.selectedProyecto = data ? data[0] : undefined;
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

    // ---------------------------------------------
    // ------Cuando el formulario es Proyecto-------
    this.reporte.ID_Proyecto = this.selectedProyecto.ID;
    this.reporte.ID_Etapa_Proyecto = this.selectedEtapa.ID;
    // ---------------------------------------------
    this.horaInicio = new Date(this.horaInicio);
    this.horaFinal = new Date(this.horaFinal);
    this.reporte.Hora_Inicio = this.horaInicio;
    this.reporte.Hora_Final = this.horaFinal;
    
    this.after.InsertarReporte(url,this.reporte).subscribe(data => {
      //console.log(data)
      this.GetReportes();
    });
    this.reporte = new Reporte();
  }

  prueba(value:any){
    let fecha = new Date(value);
    console.log(`${fecha.getHours()}:${fecha.getMinutes()}`);
  }
}
