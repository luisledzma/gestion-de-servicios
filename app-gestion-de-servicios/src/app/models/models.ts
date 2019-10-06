import { DecimalPipe } from '@angular/common';
import { NumericDictionary } from 'lodash';
// import { IndividualComponents, AccessPaymentMethodDto, ProfilesDto, PermissionDto } from "./permissionsModels"

export class Usuario {
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
export class Permiso {
    ID_Seccion: number;
    ID_Rol: number;
    Estado: string;
    Usuario_Creacion: string;
    Usuario_Modificacion: string;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
}
