using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Controllers
{
    public class LoginRequest
    {
        public int ID { get; set; }
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
    public class Permiso
    {
        public int ID { get; set; }
        public int ID_Seccion { get; set; }
        public int ID_Rol { get; set; }
        public int ID_Menu { get; set; }
        public string Descripcion_Seccion { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class SettingPermisoDto
    {
        public List<Permiso> Source { get; set; }
        public List<Permiso> Target { get; set; }
    }
    public class TareasEstandar
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class ClienteC
    {
        public int ID { get; set; }
        public string Cliente { get; set; }
        public decimal Costo_Hora { get; set; }
        public string Nombre { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class TipoReporte
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public char Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class Reporte
    {
        public int ID { get; set; }
        public int? ID_Cliente { get; set; }
        public string Cliente { get; set; }
        public int ID_Tipo_Reporte { get; set; }
        // ------------------------------------
        // ----variables si tiene proyecto-----
        public int ID_Proyecto { get; set; }
        public int ID_Etapa_Proyecto { get; set; }
        // ------------------------------------
        public string Descripcion_Tipo_Reporte { get; set; }
        public DateTime? Hora_Inicio { get; set; }
        public DateTime? Hora_Final { get; set; }
        public string Total_Horas { get; set; }
        public decimal Horas_A_Facturar { get; set; }
        public int? ID_Tareas_Estandar { get; set; }
        public string Tareas_Estandar { get; set; }
        public string Descripcion { get; set; }
        public string Observaciones { get; set; }
        public char? Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class Proyecto
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public int? ID_Cliente { get; set; }
        public string Cliente { get; set; }
        public decimal? Horas_Estimadas { get; set; }
        public TimeSpan? Horas_Invertidas { get; set; }
        public decimal Monto_Total { get; set; }
        public char? Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class EtapaProyecto
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public int? ID_Proyecto { get; set; }
        public string Proyecto { get; set; }
        public decimal? Horas_Estimadas { get; set; }
        public TimeSpan? Horas_Invertidas { get; set; }
        public char? Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
    public class Contrato
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public int? ID_Cliente { get; set; }
        public string Cliente { get; set; }
        public decimal Monto_Contrato { get; set; }
        public int horas { get; set; }
        public TimeSpan? Horas_Contratadas { get; set; }
        public TimeSpan? Horas_Disponibles { get; set; }
        public TimeSpan? Horas_Consumidas { get; set; }
        public TimeSpan? Horas_Excedidas { get; set; }
        public char? Estado { get; set; }
        public string Usuario_Creacion { get; set; }
        public string Usuario_Modificacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
}