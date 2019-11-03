import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { MessageService } from 'primeng/api';
import { Proyecto, EtapaProyecto } from '../models/models';
import { Message } from 'primeng/components/common/api';

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
  // ----------------------------------
  // ------------PROYECTOS-------------
  proyectos: any;
  selectedProyecto: Proyecto = new Proyecto();
  selectedProyectoTable: Proyecto = new Proyecto();
  // ----------------------------------
  // ---------ETAPAS PROYECTO----------
  etapas: any;
  etapa: EtapaProyecto = new EtapaProyecto();
  selectedEtapa: EtapaProyecto = new EtapaProyecto();
  estado:boolean;

  constructor(private after: AfterLoginServiceService,private messageService: MessageService) { 
    const us = localStorage.getItem('User').split('.')[1];  
    this._userExist = JSON.parse(atob(us));
    this._userInfo = this._userExist.unique_name.split(';');
  }

  ngOnInit() {
    this.GetProyectos();
    this.GetEtapasProyectoPorProyecto(0);
    //this.setValues();
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
    let url = this.apiUrl + 'Administracion/GetProyectos';
    this.after.GetProyectos(url).subscribe(data => {
      this.proyectos = data;
      //this.selectedProyecto = data ? data[0] : undefined;
      this.estado = true;
    });
  }

  GetEtapasProyectoPorProyecto(id:number){
    if(this.selectedProyectoTable.ID != 0){
      let url = this.apiUrl + 'Administracion/GetEtapasProyectoPorProyecto';
      this.after.GetEtapasProyectoPorProyecto(url,id).subscribe(data => {
        this.etapas = data;
        console.log(data);
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
}
