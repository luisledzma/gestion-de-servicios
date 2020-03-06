import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { ConfirmationService,MessageService } from 'primeng/api';
import { Usuario, Rol, TareasEstandar, Reporte, ClienteC, TipoReporte, Proyecto, EtapaProyecto, Contrato } from '../models/models';

@Component({
  selector: 'app-mant-formulario',
  templateUrl: './mant-formulario.component.html',
  styleUrls: ['./mant-formulario.component.css']
})
export class MantFormularioComponent implements OnInit {
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  // ---------------------------------
  // ------------REPORTES-------------
  reportes: any;
  reportesTipo: any;
  reporte: Reporte = new Reporte(); // Para insertar
  selectedReporte: Reporte = new Reporte(); // Para editar
  // ---------------------------------
  // ------------CLIENTES-------------
  clientes: any;
  selectedCliente: ClienteC = new ClienteC();
  // ---------------------------------
  // ---------TIPOS REPORTES----------
  tiposReportes: any;
  selectedTReporte: TipoReporte = new TipoReporte();

  tiposReportesFilter:any;
  selectedTReporteFilter: TipoReporte = new TipoReporte();

  // ---------------------------------
  // -------------TAREAS--------------
  tareasEstandar: any;
  selectedTarea: TareasEstandar = new TareasEstandar();
  horaInicio: Date;
  horaFinal: Date;
  public horas = {horasIniciales:null,horasFinales:null}

  
  // ----------------------------------
  proyectos: any;
  selectedProyecto: Proyecto = new Proyecto(); //Para Editar
  selectedProyectoGarantia: Proyecto = new Proyecto();
  //----------------------------------
  tiposRepGarantia = [
    {id: "1", name: "Proyecto"},
    {id: "2", name: "Contrato"},
    {id: "3", name: "Facturado"}
  ];
  selectedTGarantia: any;
  // ----------------------------------
  // -------------CONTRATOS------------
  contratos: any;
  selectedContrato: Contrato = new Contrato();
  selectedContratoGarantia: Contrato = new Contrato(); 
  // ------------------------------------
  // ---------------ETAPAS---------------
  etapas: any;
  selectedEtapa: EtapaProyecto = new EtapaProyecto();


  constructor(private after: AfterLoginServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { 
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
    this.GetContratosActivos();
    this.GetEtapasProyectoActivasPorProyecto(0);
    this.GetTipoReportesFilter();
  }
  
  GetReportes() {
    let url = this.apiUrl + 'Administracion/GetReportes?usuarioConsulta='+this._userInfo[0];
    this.after.GetReportes(url).subscribe(data => {
      this.reportes = data;
      this.reportesTipo = data;
    });
  }
  GetClientes(){
    let url = this.apiUrl + 'Administracion/GetClientes';
    this.after.GetClientes(url).subscribe(data => {
      this.clientes = data;
      this.selectedCliente = data ? data[0] : undefined;
    });
  }
  GetTareasEstandar() {
    let url = this.apiUrl + 'Administracion/GetTareasEstandarActivas';
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
    });
  }
  
  // -----------------------------------------------------
  // --------CODIGO PARA FILTRAR POR TIPO REPORTE---------
  GetTipoReportesFilter(){
    let url = this.apiUrl + 'Administracion/GetTipoReportes';
    this.after.GetTipoReportes(url).subscribe(data => {
      if(data){
        this.tiposReportesFilter = data;
      }
      let t: TipoReporte = new TipoReporte();
      t.ID = 0;
      t.Descripcion = 'Todos';

      this.tiposReportesFilter.unshift(t);
    });
  }

  TipoReporteFilter(){
    this.reportesTipo = [];
    if(this.selectedTReporteFilter.Descripcion == "Todos"){
      this.reportesTipo = this.reportes;
    }else{
      this.reportes.forEach(element => {
        if(element.ID_Tipo_Reporte == this.selectedTReporteFilter.ID){
          this.reportesTipo.push(element);
        }
      });
    }
  }
  // --------------------------------------------------------
  GetEtapasProyectoActivasPorProyecto(id:number){
    if(this.selectedProyecto.ID != 0){
      let url = this.apiUrl + 'Administracion/GetEtapasProyectoActivasPorProyecto';
      this.after.GetEtapasProyectoActivasPorProyecto(url,id).subscribe(data => {
        if(data){
          this.etapas = data;
          this.selectedEtapa = data ? data[0] : undefined;
        }
      });
    }
  }
  GetProyectosActivos(){
    let url = this.apiUrl + 'Administracion/GetProyectosActivos';
    this.after.GetProyectosActivos(url).subscribe(data => {
      if(data){
        this.proyectos = data;
        this.selectedProyecto = data ? data[0] : undefined;
      }
    });
  } 
  
  GetContratosActivos(){
    let url = this.apiUrl + 'Administracion/GetContratosActivos';
    this.after.GetContratosActivos(url).subscribe(data => {
      if(data){
        this.contratos = data;
        this.selectedContrato = data ? data[0] : undefined;
      }
    });
  } 
  onSubmit(){
    this.confirmInsertGeneralCalc(); // DEBE CONFIRMAR PARA INSERTAR
  }
  confirmInsertGeneralCalc() { // ES EL DIALOG PARA CONFIRMAR
    this.confirmationService.confirm({
      message: 'Esta seguro que desea continuar? Verifique bien las horas ya que no se podran modificar mas adelante',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.InsertarReporte();
      },
      reject: () => {
      }
    });
  }
  InsertarReporte() {
    let tmp = 0;
    let b = new Date(this.horaInicio);
    let e = new Date(this.horaFinal);
    this.horas.horasIniciales = `${b.getMonth() + 1}/${b.getDate()}/${b.getFullYear()} ${b.getHours()}:${b.getMinutes()}`;
    this.horas.horasFinales = `${e.getMonth() + 1}/${e.getDate()}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;


    let url = this.apiUrl + 'Administracion/InsertarReporte';
    this.reporte.Usuario_Creacion = this._userInfo[0];
    this.reporte.ID_Tipo_Reporte = this.selectedTReporte.ID;
    this.reporte.ID_Cliente = this.selectedCliente.ID;
    this.reporte.ID_Tareas_Estandar = this.selectedTarea.ID;
    this.reporte.ID_Proyecto = 0;
    this.reporte.ID_Etapa_Proyecto = 0;
    this.reporte.ID_Contrato = 0;
    this.reporte.ID_Proyecto_Garantia = 0; 
    this.reporte.ID_Contrato_Garantia = 0;

    // ---------------------------------------------
    // ------Cuando el formulario es Proyecto-------
    if(this.selectedTReporte.ID == 1){
      this.reporte.ID_Proyecto = this.selectedProyecto.ID;
      this.reporte.ID_Etapa_Proyecto = this.selectedEtapa.ID;
    }
    
    // ---------------------------------------------
    // ------Cuando el formulario es Contrato-------
    if(this.selectedTReporte.ID == 2){
      this.reporte.ID_Contrato =this.selectedContrato.ID;
    }
    // ---------------------------------------------
    // ------Cuando el formulario es Garantia-------
    if(this.selectedTReporte.ID == 4){
      this.reporte.ID_Proyecto_Garantia = this.selectedProyectoGarantia.ID;
      this.reporte.ID_Contrato_Garantia = this.selectedContratoGarantia.ID;
    }
    // ---------------------------------------------
    this.horaInicio = new Date(this.horaInicio);
    this.horaFinal = new Date(this.horaFinal);
    this.reporte.Begin_Hour = `${b.getMonth() + 1}/${b.getDate()}/${b.getFullYear()} ${b.getHours()}:${b.getMinutes()}`;
    this.reporte.End_Hour = `${e.getMonth() + 1}/${e.getDate()}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
    // console.log("Hora Inicial"+this.reporte.Hora_Inicio);
    // console.log("Hora Final"+ this.reporte.Hora_Final);
    console.log(this.reporte);
    this.after.InsertarReporte(url,this.reporte).subscribe(data => {
      //console.log(data)
      this.GetReportes();
      if(data){
        this.messageService.add({
          severity: "success",
          summary: "Correcto",
          detail: "Se ha insertado correctamente."
        });
      }else{
        this.messageService.add({
          severity: "error",
          summary: "No se pudo insertar",
          detail: "Ha habido un problema al insertar el reporte"
        });
      }
      
    });
    this.reporte = new Reporte();
  }
  // --------------------------------------
  // -----------EDITAR REPORTE-------------
  onButtonEditClick(reporte:Reporte){
    this.selectedReporte = reporte;
  }

  onSubmitEdit(){
    this.EditarReporte();
  }

  EditarReporte(){
    this.selectedEtapa.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Administracion/EditarReporte';
    this.after.EditarReporte(url,this.selectedReporte).subscribe(data => {

      if(data){
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha editado correctamente'});
      }else{
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
    });
  }
  prueba(value:any){
    // let fecha = new Date(value);
    // console.log(`${fecha.getHours()}:${fecha.getMinutes()}`);
    console.log(this.selectedTGarantia);
  }
}
