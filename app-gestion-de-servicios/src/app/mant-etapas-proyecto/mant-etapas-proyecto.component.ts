import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { MessageService } from 'primeng/api';
import { Proyecto, EtapaProyecto } from '../models/models';
import { Message } from 'primeng/components/common/api';
import { ExcelServiceService } from '../service/excel-service.service';

@Component({
  selector: 'app-mant-etapas-proyecto',
  templateUrl: './mant-etapas-proyecto.component.html',
  styleUrls: ['./mant-etapas-proyecto.component.css']
})
export class MantEtapasProyectoComponent implements OnInit {
  // ----------------------------------
  // ---------Configuración------------
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  myMenu: any;
  menus: any;
  permisos: any;
  misPermisos: any;
  page: string = "Etapas Proyecto";
  // ----------------------------------
  // ------------PROYECTOS-------------
  proyectos: any;
  proyectosActivos: any;
  selectedProyecto: Proyecto = new Proyecto();
  selectedProyectoTable: Proyecto = new Proyecto();
  // ----------------------------------
  // ---------ETAPAS PROYECTO----------
  etapas: any;
  etapa: EtapaProyecto = new EtapaProyecto();
  selectedEtapa: EtapaProyecto = new EtapaProyecto();
  estado:boolean;

  cols = [
    { field: 'ID', header: 'N°'},
    { field: 'Descripcion', header: 'Descripción' },
    { field: 'Proyecto', header: 'Proyecto' },
    { field: 'Horas_Estimadas', header: 'Horas estimadas' },
    { field: 'Horas_Invertidas', header: 'Horas invertidas' },
    { field: 'Estado', header: 'Estado' },
    { field: 'Fecha_Creacion', header: 'Fecha Creación'},
    { field: 'Editar', header: '' },
  ];

  Estados = [
    { label: 'Todos', value: null },
    { label: 'Activo', value: 'A' },
    { label: 'Inactivo', value: 'I' }
  ];

  colsPDF = [
    { dataKey: 'ID', header: 'N°'},
    { dataKey: 'Descripcion', header: 'Descripción' },
    { dataKey: 'Proyecto', header: 'Proyecto' },
    { dataKey: 'Horas_Invertidas', header: 'Horas invertidas' },
  ];

  public dates = {
    begin: null,
    end: null,
  };

  constructor(private after: AfterLoginServiceService,
    private messageService: MessageService,
    private _ExcelService: ExcelServiceService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
    this.setPermisos();
  }

  ngOnInit() {
    this.GetProyectos();
    this.GetProyectosActivos();
    this.GetEtapasProyectoPorProyecto(0);
    //this.setValues();
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
  
  setValues(){
    let tempPro: Proyecto = {
      ID: 0,
      Descripcion: 'Seleccione Proyecto',
      ID_Cliente: 0,
      Cliente: ' ',
      Horas_Estimadas: 0,
      Horas_Invertidas: 0,
      Monto_Total: 0,
      Estado: 'A',
      Usuario_Creacion: 'SA', 
      Usuario_Modificacion: 'SA',
      Fecha_Creacion: new Date,
      Fecha_Modificacion: new Date
    } 

    this.selectedProyecto = tempPro;
  }

  GetProyectos(){
    let url = this.apiUrl + 'Administracion/GetProyectos?usuarioConsulta='+this._userInfo[0];
    this.after.GetProyectos(url).subscribe(data => {
      if(data){
        this.proyectos = data;
        //this.selectedProyecto = data ? data[0] : undefined;
        this.estado = true;
      }
    });
  }
  GetProyectosActivos(){
    let url = this.apiUrl + 'Administracion/GetProyectosActivos';
    this.after.GetProyectosActivos(url, 0).subscribe(data => {
      if(data){
        this.proyectosActivos = data;
      }
      this.selectedProyecto = data ? data[0] : undefined;
    });
  }
  GetEtapasProyectoPorProyecto(id:number){
    if(this.selectedProyectoTable.ID != 0){
      let url = this.apiUrl + 'Administracion/GetEtapasProyectoPorProyecto';
      this.after.GetEtapasProyectoPorProyecto(url,id,this._userInfo[0]).subscribe(data => {
        if(data){
          this.etapas = data;
        }
      });
    }
  }
  GetEtapasProyectoPorProyectoYFecha(id:number){
    if(this.selectedProyectoTable.ID != 0){
      let url = this.apiUrl + 'Administracion/GetEtapasProyectoPorProyectoYFecha';
      let b = new Date(Date.parse(this.dates.begin));
      let e = new Date(Date.parse(this.dates.end));
      this.dates.begin = `${b.getMonth() + 1}/${b.getDate()}/${b.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
      this.dates.end = `${e.getMonth() + 1}/${e.getDate()}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
      this.after.GetEtapasProyectoPorProyectoYFecha(url,id,this._userInfo[0], this.dates.begin, this.dates.end).subscribe(data => {
        if(data && data.length > 0){
          this.etapas = data;
        }else{
          this.messageService.add({
            severity: "warn",
            summary: "Sin etapas",
            detail: "No se encontraron etapas en el rango de fechas especificado"
          });
        }
      });
    }
  }
  // --------------------------------------
  // ----------Insertar Proyecto-----------
  onSubmit(){
    this.InsertarEtapaProyecto();
  }

  InsertarEtapaProyecto() {
    let url = this.apiUrl + 'Administracion/InsertarEtapaProyecto';
    this.etapa.ID_Proyecto = this.selectedProyecto.ID;
    this.etapa.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarEtapaProyecto(url,this.etapa).subscribe(data => {
      this.GetEtapasProyectoPorProyecto(0);
      if(data){
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha guardado correctamente'});
      }else{
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
      this.etapa = new EtapaProyecto();
    });
  }

  // --------------------------------------
  // -----------Editar Proyecto------------

  onButtonEditClick(etapa:EtapaProyecto){
    this.selectedEtapa = etapa;
  }

  onSubmitEdit(){
    this.EditarEtapaProyecto();
  }

  EditarEtapaProyecto(){
    this.selectedEtapa.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Administracion/EditarEtapaProyecto';
    this.after.EditarEtapaProyecto(url,this.selectedEtapa).subscribe(data => {
      this.GetEtapasProyectoPorProyecto(0);

      if(data){
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha editado correctamente'});
      }else{
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
    });
  }
  exportExcel(data) {

    let pDataExport = [];
  
    let date = new Date()
    let day = date.getMonth()+1 + '-' + date.getFullYear();
    let pNameFile: string = "Reporte de etapas " + day;
  
    setTimeout(() => {
      if(data){
        if(data.filteredValue){
          if(data.filteredValue.length > 0){
            
            data.filteredValue.forEach(element => {
              pDataExport.push({
                'N°':element.ID,
                'Descripción': element.Descripcion,
                Proyecto: element.Proyecto,
                'Horas invertidas': element.Horas_Invertidas,
              });
            });
            this._ExcelService.exportAsExcelFile(pDataExport, pNameFile);
          }
        }else{
          this.etapas.forEach(element => {
            pDataExport.push({
              'N°':element.ID,
              'Descripción': element.Descripcion,
              Proyecto: element.Proyecto,
              'Horas invertidas': element.Horas_Invertidas,
            });
          });
          this._ExcelService.exportAsExcelFile(pDataExport, pNameFile);
        }
      }
  
    }, 300);
  }
  exportPdf(data){
    let pDataExport = [];
  
    let date = new Date()
    let day = date.getMonth()+1 + '-' + date.getFullYear();
    let pNameFile: string = "Reporte de etapas " + day;
  
    setTimeout(() => {
      if(data){
        if(data.filteredValue){
          if(data.filteredValue.length > 0){
            
            data.filteredValue.forEach(element => {
              pDataExport.push({
                'ID':element.ID,
                'Descripcion': element.Descripcion,
                'Proyecto': element.Proyecto,
                'Horas_Invertidas': element.Horas_Invertidas,
              });
            });
            //console.log(pDataExport);
            this._ExcelService.exportPdf(pDataExport, this.colsPDF, pNameFile);
          }
        }else{
          this.etapas.forEach(element => {
            pDataExport.push({
              'ID':element.ID,
              'Descripcion': element.Descripcion,
              'Proyecto': element.Proyecto,
              'Horas_Invertidas': element.Horas_Invertidas,
            });
          });
          //console.log(pDataExport);
          this._ExcelService.exportPdf(pDataExport, this.colsPDF, pNameFile);
        }
      }
  
    }, 300);
  }
}
