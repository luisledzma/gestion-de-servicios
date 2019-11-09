import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { MessageService } from 'primeng/api';
import {KeyFilterModule} from 'primeng/keyfilter';
import { ClienteC } from '../models/models';

@Component({
  selector: 'app-mant-clientes',
  templateUrl: './mant-clientes.component.html',
  styleUrls: ['./mant-clientes.component.css']
})
export class MantClientesComponent implements OnInit {
 // ----------------------------------
  // ---------Configuración------------
  private apiUrl = environment.apiURL;
  _userExist: any;
  _userInfo: any;
  // ----------------------------------
  // ---------Clientes------------
  
  clientes: any;
  selectedClient:any;
  cliente: ClienteC = new ClienteC();
  misClientes:any;
  editCliente:ClienteC = new ClienteC();

  //----------Permisos
  myMenu: any;
  menus: any;
  permisos: any;
  misPermisos: any;
  page: string = "Clientes";

  constructor(private after: AfterLoginServiceService,private messageService: MessageService) {
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
    this.setPermisos();
   }

  ngOnInit() {
    this.GetClientesERP();
    this.GetClientes();
  }

  GetClientesERP(){
    let url = this.apiUrl + 'Administracion/GetClientesERP';
    this.after.GetClientesERP(url).subscribe(data => {
      this.clientes = data;
      this.selectedClient = data ? data[0] : undefined;
    });
  }
  GetClientes(){
    let url = this.apiUrl + 'Administracion/GetClientes';
    this.after.GetClientes(url).subscribe(data => {
      this.misClientes = data;
    });
  }

  onSubmit(){
    this.InsertarCliente();
  }

  onButtonEditClick(pcliente:ClienteC){
    this.editCliente = pcliente;
  }

  InsertarCliente() {
    let url = this.apiUrl + 'Administracion/InsertarCliente';
    this.cliente.Usuario_Creacion = this._userInfo[0];
    this.cliente.Cliente = this.selectedClient.Cliente;
    this.after.InsertarCliente(url, this.cliente).subscribe(data => {
      this.GetClientes();
    })

  }


  onSubmitEdit() {
    this.EditarCliente();
  }

  EditarCliente() {
    this.editCliente.Usuario_Modificacion = this._userInfo[0];
    let url = this.apiUrl + 'Administracion/EditarCliente';
    this.after.EditarCliente(url, this.editCliente).subscribe(data => {
      this.GetClientes();
    })
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



}
