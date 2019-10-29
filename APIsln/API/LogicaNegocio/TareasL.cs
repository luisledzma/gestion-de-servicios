using API.Controllers;
using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.LogicaNegocio
{
    public class TareasL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<TareasEstandar> GetTareasEstandar()
        {
            try
            {
                var result = (from c in _db.SP_ADM_Seleccionar_Tareas_Estandar()

                              select new TareasEstandar()
                              {
                                  ID = c.ID,
                                  Descripcion = c.Descripcion,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion

                              }).ToList();
                if(result != null)
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<TareasEstandar>();
        }
        public bool InsertarTareaEstandar(TareasEstandar tarea)
        {
            try
            {
                var result = _db.SP_ADM_Insertar_Tarea_Estandar(tarea.Descripcion, tarea.Estado, tarea.Usuario_Creacion);
                if (result < 0)
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
        public bool EditarTareaEstandar(TareasEstandar tarea)
        {
            try
            {
                _db.SP_ADM_Editar_Tarea_Estandar(tarea.ID, tarea.Descripcion, tarea.Estado, tarea.Usuario_Modificacion);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}