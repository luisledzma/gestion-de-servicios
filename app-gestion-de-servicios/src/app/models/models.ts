import { DecimalPipe } from '@angular/common';
import { NumericDictionary } from 'lodash';
// import { IndividualComponents, AccessPaymentMethodDto, ProfilesDto, PermissionDto } from "./permissionsModels"

export class Usuario {
    ID: number;
    Usuario: string;
    Contrasenna: string;
    Nombre: string;
    Correo_Electronico: string;
    Telefono: string;
    Estado: string;
    Rol: number;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class Rol {
    ID: number;
    Descripcion: string;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class Seccion {
    ID: number;
    ID_Menu: number;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class Menu {
    ID: number;
    Descripcion: string;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class Permiso {
    ID: number;
    ID_Seccion: number;
    ID_Rol: number;
    ID_Menu: number;
    Descripcion_Seccion: string;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class SettingPermisoDto {
    Source: Permiso[];
    Target: Permiso[];
}
export class TareasEstandar
{
    ID: number;
    Descripcion: string;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class ClienteC
{
    ID: number;
    Cliente: string;
    Costo_Hora: number;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class TipoReporte
{
    ID: number;
    Descripcion: string;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
export class Reporte
{
    ID : number
    ID_Cliente : number
    Cliente : string 
    ID_Tipo_Reporte : number
    Descripcion_Tipo_Reporte : string
    Hora_Inicio : string;
    Hora_Final : string;
    Total_Horas : number;
    Horas_A_Facturar : number;
    ID_Tareas_Estandar : number;
    Tareas_Estandar : string;
    Descripcion : string;
    Observaciones : string;
    Estado : string;
    Usuario_Creacion : string;
    Usuario_Modificacion : string;
    Fecha_Creacion : Date;
    Fecha_Modificacion : Date;
}
