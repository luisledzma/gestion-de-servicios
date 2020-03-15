import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { ClienteC, Proyecto } from '../models/models';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { ExcelServiceService } from '../service/excel-service.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  // ----------------------------------
  // ---------Configuración------------
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  // ----------------------------------
  proyectos: any;
  proyecto: Proyecto = new Proyecto(); // Para insertar
  selectedProyecto: Proyecto = new Proyecto(); //Para Editar
  // ----------------------------------
  clientes: any;
  selectedCliente: ClienteC = new ClienteC();
  // ----------------------------------
  msgs: Message[] = [];


  cols = [
    { field: 'ID', header: 'N°'},
    { field: 'Descripcion', header: 'Descripción' },
    { field: 'Cliente', header: 'Cliente' },
    { field: 'Horas_Invertidas', header: 'Horas invertidas' },
    { field: 'Monto_Total', header: 'Monto total' },
    { field: 'Estado', header: 'Estado' },
    { field: '', header: 'Editar' },
  ];

  Estados = [
    { label: 'Todos', value: null },
    { label: 'Activo', value: 'A' },
    { label: 'Inactivo', value: 'I' }
  ];

  constructor(private after: AfterLoginServiceService,
    private messageService: MessageService,
    private _ExcelService: ExcelServiceService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
  }

  ngOnInit() {
    this.GetProyectos();
    this.GetClientes();
  }

  GetProyectos(){
    let url = this.apiUrl + 'Administracion/GetProyectos?usuarioConsulta='+this._userInfo[0];
    this.after.GetProyectos(url).subscribe(data => {
      this.proyectos = data;
      this.selectedProyecto = data ? data[0] : undefined;
    });
  }
  
  GetClientes(){
    let url = this.apiUrl + 'Administracion/GetClientes';
    this.after.GetClientes(url).subscribe(data => {
      this.clientes = data;
      this.selectedCliente = data ? data[0] : undefined;
    });
  }
  
  // --------------------------------------
  // ----------Insertar Proyecto-----------
  onSubmit(){
    this.InsertarProyecto();
  }

  InsertarProyecto() {
    let url = this.apiUrl + 'Administracion/InsertarProyecto';
    this.proyecto.ID_Cliente = this.selectedCliente.ID;
    this.proyecto.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarProyecto(url,this.proyecto).subscribe(data => {
      this.GetProyectos();
      if(data){
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Correcto', detail:'Se ha guardado correctamente'});
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha guardado correctamente'});
      }else{
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Incorrecto', detail:'No se ha guardado el proyecto'});
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
      this.proyecto = new Proyecto();
      setTimeout(()=>{  
        this.msgs = [];
      }, 3000);
    });
    
  }

  // --------------------------------------
  // -----------Editar Proyecto------------

  onButtonEditClick(pro:Proyecto){
    this.selectedProyecto = pro;
  }

  onSubmitEdit(){
    this.EditarProyecto();
  }

  EditarProyecto(){
    this.selectedProyecto.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Administracion/EditarProyecto';
    this.after.EditarProyecto(url,this.selectedProyecto).subscribe(data => {
      this.GetProyectos();

      if(data){
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Correcto', detail:'Se ha editado correctamente'});
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha editado correctamente'});
      }else{
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Incorrecto', detail:'No se ha editado el proyecto'});
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
      setTimeout(()=>{  
        this.msgs = [];
      }, 3000);
    });
  }
  exportExcel(data) {

    let pDataExport = [];

    let date = new Date()
    let day = date.getMonth()+1 + '-' + date.getFullYear();
    let pNameFile: string = "Reporte de proyectos " + day;

    setTimeout(() => {
      if(data){
        if(data.filteredValue){
          if(data.filteredValue.length > 0){
            
            data.filteredValue.forEach(element => {
              pDataExport.push({
                'N°':element.ID,
                'Descripción': element.Descripcion,
                Cliente: element.Cliente,
                'Horas invertidas': element.Horas_Invertidas,
                'Monto total': element.Monto_Total,
              });
            });
            this._ExcelService.exportAsExcelFile(pDataExport, pNameFile);
          }
        }else{
          this.proyectos.forEach(element => {
            pDataExport.push({
              'N°':element.ID,
              'Descripción': element.Descripcion,
              Cliente: element.Cliente,
              'Horas invertidas': element.Horas_Invertidas,
              'Monto total': element.Monto_Total,
            });
          });
          this._ExcelService.exportAsExcelFile(pDataExport, pNameFile);
        }
      }

    }, 300);
  }
}
