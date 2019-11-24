import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCorreo } from '../models/models';
import { environment } from 'src/environments/environment';
import { BeforeLoginServiceService } from '../service/before-login-service.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  href: string = "";
  respuesta: RespuestaCorreo = new RespuestaCorreo();
  p: string;
  private apiUrl = environment.apiURL;
  estados: any ;
  selectedEstado: any;
  constructor(private router: Router, private before: BeforeLoginServiceService) { 
    this.href=this.router.url;
  }

  ngOnInit() {
    this.p = JSON.parse(atob(this.href.split("?")[1].split("=")[1].split(".")[1])).unique_name;
    this.estados = [
      {id: 'T', descripcion: 'Seleccione Estado'},
      {id: 'A', descripcion: 'Aprobar'},
      {id: 'R', descripcion: 'Rechazar'}
    ];
    this.selectedEstado = {id: 'T', descripcion: 'Seleccione Estado'};
  }

  onSubmit(){
    this.EditarReporteRespuestaCorreo();
  }

  EditarReporteRespuestaCorreo(){
    let url = this.apiUrl + 'Administracion/EditarReporteRespuestaCorreo';
    this.respuesta.Mensaje_Encriptado = this.p;
    this.respuesta.Clave = "CB5%182";
    this.respuesta.Estado = this.selectedEstado.id;


    this.before.EditarReporteRespuestaCorreo(url, this.respuesta).subscribe(data => {
      console.log(data);
    });
  }

}
