import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule,HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { routing } from './app-routing.module';
import { BackendComponent } from './backend/backend.component';
import { AfterLoginServiceService } from './service/after-login-service.service';
import { JarwisServiceService } from './service/jarwis-service.service';
import { BeforeLoginServiceService } from './service/before-login-service.service';
import { AuthServiceService } from './service/auth-service.service';
import { TokenServiceService } from './service/token-service.service';
import { MessageService } from 'primeng/components/common/messageservice';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponentComponent,
    BackendComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    PanelModule,
    HttpClientModule

  ],
  providers: [
    AfterLoginServiceService,
    JarwisServiceService,
    BeforeLoginServiceService,
    AuthServiceService,
    TokenServiceService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
