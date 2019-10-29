import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisServiceService } from '../service/jarwis-service.service';
import { TokenServiceService } from '../service/token-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Usuario } from '../models/models';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public form = {
    Correo_Electronico: null,
    Contrasenna: null
  };

  usuario: Usuario = new Usuario();
  message: Message[] = [];
  public error = null;
  constructor(private Jarwis: JarwisServiceService,
              private Token: TokenServiceService,
              private router: Router,
              private Auth: AuthServiceService,
              private messageService: MessageService) {

              }

  onSubmit() {
    this.Jarwis.login(this.usuario).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data) {
    //console.log(JSON.stringify(data));
    localStorage.setItem('User', JSON.stringify(data));
    this.Token.handle(data);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl("/backend");
    // console.log(data);
    // if (data.user.role_id == 1) {
    //   this.router.navigateByUrl('/adminbackend');
    // }
    // else if (data.user.role_id == 2) {
    //   this.router.navigateByUrl('/pacientebackend');
    // }
    // else if (data.user.role_id == 4) {
    //   this.router.navigateByUrl('/medicobackend');
    // }

  }

  handleError(error) {
    if (error.ok === false) {
      this.message = [];
      this.message.push({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
    }
    // this.error = error.error.error;
  }
  
  ngOnInit() {
  }


}
