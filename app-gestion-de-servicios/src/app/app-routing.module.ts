
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BeforeLoginServiceService } from './service/before-login-service.service';
import { AfterLoginServiceService } from './service/after-login-service.service';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { BackendComponent } from './backend/backend.component';
import { MantRolComponent } from './mant-rol/mant-rol.component';
import { MantUsuarioComponent } from './mant-usuario/mant-usuario.component';
import { ContratosComponent } from './contratos/contratos.component';
import { MantTareasEstandarComponent } from './mant-tareas-estandar/mant-tareas-estandar.component';
import { ParametrosSistemaComponent } from './parametros-sistema/parametros-sistema.component';
import { PermisosSistemaComponent } from './permisos-sistema/permisos-sistema.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { MantFormularioComponent } from './mant-formulario/mant-formulario.component';
import { MantEtapasProyectoComponent } from './mant-etapas-proyecto/mant-etapas-proyecto.component';
import { MantClientesComponent } from './mant-clientes/mant-clientes.component';


const appRoutes: Routes = [
  // { path: '', redirectTo: 'internallogin', pathMatch: 'full' },
  // { path: 'internallogin', component: UserLoginComponent },
  // { path: 'login', component: UserLoginComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginServiceService] },
  //{ path: 'signup', component: SingupComponent, canActivate: [BeforeLoginServiceService] },

  // {path: 'informacion',component: InformacionComponent,canActivate: [BeforeLoginService]},
  //{path: 'informacionfinal',component: InformacionfinalComponent,canActivate: [BeforeLoginService]},

  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AfterLoginService]
  // },

  // /* BACKEND ADMIN */
  {
    path: 'backend', component: BackendComponent, canActivate: [AfterLoginServiceService], children: [
      { path: 'home', component: HomeComponentComponent, canActivate: [AfterLoginServiceService] },
      { path: 'mantRol', component: MantRolComponent, canActivate: [AfterLoginServiceService] },
      { path: 'mantUsuario', component: MantUsuarioComponent, canActivate: [AfterLoginServiceService] },
      { path: 'contratos', component: ContratosComponent, canActivate: [AfterLoginServiceService] },
      { path: 'tareasEstandar', component: MantTareasEstandarComponent, canActivate: [AfterLoginServiceService] },
      { path: 'parametrosSistema', component: ParametrosSistemaComponent, canActivate: [AfterLoginServiceService] },
      { path: 'permisosSistema', component: PermisosSistemaComponent, canActivate: [AfterLoginServiceService] },
      { path: 'proyectos', component: ProyectosComponent, canActivate: [AfterLoginServiceService] },
      { path: 'formularios', component: MantFormularioComponent, canActivate: [AfterLoginServiceService] },
      { path: 'etapasProyecto', component: MantEtapasProyectoComponent, canActivate: [AfterLoginServiceService] },
      { path: 'clientes', component: MantClientesComponent, canActivate: [AfterLoginServiceService] },
    ]
  },

 
  // /* BACKEND iNVITADOS */
  // {
  //     path: 'invitadobackend', component: MasterpageagentBackendComponent, children: [


  //     ]
  // },
  { path: '**', redirectTo: 'login' }
]

export const routing = RouterModule.forRoot(appRoutes);