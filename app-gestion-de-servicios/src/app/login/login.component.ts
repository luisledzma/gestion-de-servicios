import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisServiceService } from '../service/jarwis-service.service';
import { TokenServiceService } from '../service/token-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    UserEmail: null,
    UsrPasw: null
  };
  public error = null;
  constructor(private Jarwis: JarwisServiceService,
    private Token: TokenServiceService,
    private router: Router,
    private Auth: AuthServiceService)
     { }

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data) {
    //console.log(data);
    localStorage.setItem('User', JSON.stringify(data));
    this.Token.handle(data);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/backend');
    //console.log(data);
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
    console.log(error);
    this.error = error.error.error;
  }
  ngOnInit() {
  }


}
