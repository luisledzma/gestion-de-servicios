using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Controllers
{
    public class LoginRequest
    {
        public string Usuario { get; set; }
        public string Contrasenna { get; set; }
        public string Nombre { get; set; }
        public string Correo_Electronico { get; set; }
        public string Telefono { get; set; }
        public char Estado { get; set; }
        public int Rol { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

    }

    public class Rol
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class Seccion
    {
        public int ID { get; set; }
        public int ID_Menu { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public DateTime Fecha_Modificacion { get; set; }
    }
    public class Permiso
    {
        public int ID_Seccion { get; set; }
        public int ID_Rol { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class Menu
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
}