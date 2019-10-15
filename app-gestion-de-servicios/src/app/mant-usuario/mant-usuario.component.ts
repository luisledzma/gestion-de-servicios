import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AfterLoginServiceService } from '../service/after-login-service.service';
import { Usuario, Rol } from '../models/models';

@Component({
  selector: 'app-mant-usuario',
  templateUrl: './mant-usuario.component.html',
  styleUrls: ['./mant-usuario.component.css']
})
export class MantUsuarioComponent implements OnInit {

  private apiUrl = environment.apiURL;
  usuarios : any
  usuarioDetalle : Usuario = new Usuario();
  rol: any;

  constructor(private after: AfterLoginServiceService) {
    
   }

  ngOnInit() {
    this.GetUsuarios();
  }

  GetUsuarios() {
    let url = this.apiUrl + 'Seguridad/GetUsuarios';
    this.after.GetUsuarios(url).subscribe(data => {
      this.usuarios = data;
    });
  }

  onDetailsClick(usuario:Usuario){
    this.usuarioDetalle = usuario;
    this.GetRolPorId(usuario.Rol);
  }

  GetRolPorId(idRol:number) {
    let url = this.apiUrl + 'Seguridad/GetRolPorId';
    this.after.GetRolPorId(url,idRol).subscribe(data => {
      this.rol = data;
    });
  }

}
