import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// --------------------------------------------------
// --------------------PrimeNG-----------------------
import { MessageService } from 'primeng/components/common/messageservice';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MantRolComponent } from './mant-rol/mant-rol.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponentComponent,
    BackendComponent,
    MantRolComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    PanelModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    ToastModule

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
