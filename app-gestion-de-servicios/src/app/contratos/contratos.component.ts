import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { ClienteC, Contrato } from '../models/models';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Time } from '@angular/common';
import { ExcelServiceService } from '../service/excel-service.service';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  // ----------------------------------
  // ---------Configuración------------
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  myMenu: any;
  menus: any;
  permisos: any;
  misPermisos: any;
  page: string = "Contratos";
  // ----------------------------------
  // ------------CONTRATOS-------------
  contratos: any;
  contrato: Contrato = new Contrato(); // Para insertar
  selectedcontrato: Contrato = new Contrato(); //Para Editar
  miContrato: Contrato = new Contrato();//Para cierre de mes
  // ----------------------------------
  clientes: any;
  selectedCliente: ClienteC = new ClienteC();

  cols = [
    { field: 'ID', header: 'N°'},
    { field: 'Descripcion', header: 'Descripción' },
    { field: 'Cliente', header: 'Cliente' },
    { field: 'Monto_Total', header: 'Monto contrato' },
    { field: 'Horas_Contratadas', header: 'Horas contratadas' },
    { field: 'Horas_Disponibles', header: 'Horas disponibles' },
    { field: 'Horas_Consumidas', header: 'Horas consumidas' },
    { field: 'Horas_Excedidas', header: 'Horas excedidas' },
    { field: 'Estado', header: 'Estado' },
    { field: 'Fecha_Creacion', header: 'Fecha Creación'},
    { field: 'Editar', header: '' },
    { field: 'Cierre', header: 'Cierre de mes' },
  ];

  public dates = {
    begin: null,
    end: null,
  };

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
    this.setPermisos();
  }

  ngOnInit() {
    this.GetClientes();
    this.GetContratos();
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

  GetContratos(){
    let url = this.apiUrl + 'Administracion/GetContratos?usuarioConsulta='+this._userInfo[0];
    this.after.GetContratos(url).subscribe(data => {
      if(data){
        this.contratos = data;
        this.selectedcontrato = data ? data[0] : undefined;
      }
    });
  }
  GetContratosPorFecha(){
    let url = this.apiUrl + 'Administracion/GetContratosPorFecha'
    let b = new Date(Date.parse(this.dates.begin));
    let e = new Date(Date.parse(this.dates.end));
    this.dates.begin = `${b.getMonth() + 1}/${b.getDate()}/${b.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
    this.dates.end = `${e.getMonth() + 1}/${e.getDate()}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
    
    this.after.GetContratosPorFecha(url, this.dates.begin, this.dates.end, this._userInfo[0]).subscribe(data => {
      if(data && data.length > 0){
        this.contratos = data;
        this.selectedcontrato = data ? data[0] : undefined;
      }else{
        this.messageService.add({
          severity: "warn",
          summary: "Sin contratos",
          detail: "No se encontraron contratos en el rango de fechas especificado"
        });
      }
    });
    
  }

  GetClientes(){
    let url = this.apiUrl + 'Administracion/GetClientes';
    this.after.GetClientes(url).subscribe(data => {
      if(data){
        this.clientes = data;
        this.selectedCliente = data ? data[0] : undefined;
      }
    });
  }
  // --------------------------------------
  // ----------Insertar Contrato-----------
  onSubmit(){
    this.InsertarContrato();
  }

  InsertarContrato() {
    let url = this.apiUrl + 'Administracion/InsertarContrato';
    this.contrato.ID_Cliente = this.selectedCliente.ID;
    this.contrato.Usuario_Creacion = this._userInfo[0];
    this.after.InsertarContrato(url,this.contrato).subscribe(data => {
      this.GetContratos();
      if(data){
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha guardado correctamente'});
      }else{
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
      this.contrato = new Contrato();
    });
    
  }
  // --------------------------------------
  // -----------Editar Contrato------------

  onButtonEditClick(con:Contrato){
    this.selectedcontrato = con;
  }

  onSubmitEdit(){
    this.EditarContrato();
  }

  EditarContrato(){
    this.selectedcontrato.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Administracion/EditarContrato';
    this.after.EditarContrato(url,this.selectedcontrato).subscribe(data => {
      this.GetContratos();

      if(data){    
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha editado correctamente'});
      }else{      
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha guardado el proyecto'});
      }
    });
  }

  
cierreDeMes(con:Contrato){
  this.miContrato = con;
}

onSubmitCierreDeMes(){
  this.miContrato.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Administracion/CierreDeMes';
    this.after.CierreMes(url,this.miContrato).subscribe(data => {
      this.GetContratos();
      if(data){    
        this.messageService.add({severity:'success', summary: 'Correcto', detail:'Se ha ejecutado correctamente'});
      }else{      
        this.messageService.add({severity:'error', summary: 'Incorrecto', detail:'No se ha ejecutado correctamente'});
      }
    });
}
exportExcel(data) {

  let pDataExport = [];

  let date = new Date()
  let day = date.getMonth()+1 + '-' + date.getFullYear();
  let pNameFile: string = "Reporte de contratos " + day;

  setTimeout(() => {
    if(data){
      if(data.filteredValue){
        if(data.filteredValue.length > 0){
          
          data.filteredValue.forEach(element => {
            pDataExport.push({
              'N°':element.ID,
              'Descripción': element.Descripcion,
              Cliente: element.Cliente,
              'Monto contrato': element.Monto_Contrato,
              'Horas contratadas': element.Horas_Contratadas,
              'Horas disponibles': element.Horas_Disponibles,
              'Horas consumidas': element.Horas_Consumidas,
              'Horas excedidas': element.Horas_Excedidas,
            });
          });
          this._ExcelService.exportAsExcelFile(pDataExport, pNameFile);
        }
      }else{
        this.contratos.forEach(element => {
          pDataExport.push({
            'N°':element.ID,
              'Descripción': element.Descripcion,
              Cliente: element.Cliente,
              'Monto contrato': element.Monto_Contrato,
              'Horas contratadas': element.Horas_Contratadas,
              'Horas disponibles': element.Horas_Disponibles,
              'Horas consumidas': element.Horas_Consumidas,
              'Horas excedidas': element.Horas_Excedidas,
          });
        });
        this._ExcelService.exportAsExcelFile(pDataExport, pNameFile);
      }
    }

  }, 300);
}


}

