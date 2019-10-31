import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol, TareasEstandar, ClienteC, Proyecto } from '../models/models';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';


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

  constructor(private after: AfterLoginServiceService,private messageService: MessageService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
  }

  ngOnInit() {
    this.GetProyectos();
    this.GetClientes();
  }

  GetProyectos(){
    let url = this.apiUrl + 'Administracion/GetProyectos';
    this.after.GetProyectos(url).subscribe(data => {
      this.proyectos = data;
      this.selectedProyecto = data ? data[0] : undefined;
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
      }else{
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Incorrecto', detail:'No se ha guardado el proyecto'});
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
      }else{
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Incorrecto', detail:'No se ha editado el proyecto'});
      }
      setTimeout(()=>{  
        this.msgs = [];
      }, 3000);
    });
  }
}
