using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using API.Controllers;
using API.WebserviceData;

namespace API.LogicaNegocio
{
    public class ReporteL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();
        public List<Reporte> GetReportes()
        {
            try
            {
                var result = (from r in _db.SP_ADM_Seleccionar_Reportes()
                              select new Reporte
                              {
                                  ID = r.ID,
                                  ID_Cliente = r.ID_Cliente,
                                  Cliente = r.Cliente,
                                  ID_Tipo_Reporte = r.ID_Tipo_Reporte,
                                  Descripcion_Tipo_Reporte = r.Descripcion_Tipo_Reporte,
                                  Hora_Inicio = r.Hora_Inicio,
                                  Hora_Final = r.Hora_Final,
                                  Total_Horas = r.Total_Horas.ToString(),
                                  Horas_A_Facturar = r.Horas_A_Facturar,
                                  ID_Tareas_Estandar = r.ID_Tareas_Estandar,
                                  Tareas_Estandar = r.Tareas_Estandar,
                                  Descripcion = r.Descripcion,
                                  Observaciones = r.Observaciones,
                                  Estado = r.Estado,
                                  Usuario_Creacion = r.Usuario_Creacion,
                                  Usuario_Modificacion = r.Usuario_Modificacion,
                                  Fecha_Creacion = r.Fecha_Creacion,
                                  Fecha_Modificacion = r.Fecha_Modificacion
                              }).ToList(); 
                if (result != null)
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Reporte>();
        }
        public List<TipoReporte> GetTipoReportes()
        {
            try
            {
                var result = (from r in _db.SP_ADM_Seleccionar_Tipo_Reportes()
                              select new TipoReporte
                              {
                                  ID = r.ID,
                                  Descripcion = r.Descripcion,
                                  Estado = r.Estado,
                                  Usuario_Creacion = r.Usuario_Creacion,
                                  Usuario_Modificacion = r.Usuario_Modificacion,
                                  Fecha_Creacion = r.Fecha_Creacion,
                                  Fecha_Modificacion = r.Fecha_Modificacion
                              }).ToList();
                if (result != null)
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<TipoReporte>();
        }
        public bool InsertarReporte(Reporte reporte)
        {
            try
            {
                var result = _db.SP_ADM_Insertar_Reporte(reporte.ID_Cliente, reporte.ID_Tipo_Reporte, reporte.ID_Proyecto,reporte.ID_Etapa_Proyecto,reporte.Hora_Inicio, reporte.Hora_Final, reporte.Horas_A_Facturar, reporte.ID_Tareas_Estandar, reporte.Descripcion, reporte.Observaciones, reporte.Estado, reporte.Usuario_Creacion);
                if(result < 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool EditarReporte(Reporte reporte)
        {
            try
            {
                _db.SP_ADM_Editar_Reporte(reporte.ID,reporte.Descripcion,reporte.Observaciones,reporte.Estado,reporte.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}