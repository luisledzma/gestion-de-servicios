import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { ClienteC, Contrato } from '../models/models';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Time } from '@angular/common';


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
  // ----------------------------------
  // ------------CONTRATOS-------------
  contratos: any;
  contrato: Contrato = new Contrato(); // Para insertar
  selectedcontrato: Contrato = new Contrato(); //Para Editar
  // ----------------------------------
  clientes: any;
  selectedCliente: ClienteC = new ClienteC();

  constructor(private after: AfterLoginServiceService,private messageService: MessageService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
  }

  ngOnInit() {
    this.GetClientes();
    this.GetContratos();
  }

  GetContratos(){
    let url = this.apiUrl + 'Administracion/GetContratos';
    this.after.GetContratos(url).subscribe(data => {
      this.contratos = data;
      this.selectedcontrato = data ? data[0] : undefined;
      //console.log(data);
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
}
