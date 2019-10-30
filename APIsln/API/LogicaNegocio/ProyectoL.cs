using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using API.Controllers;
using API.WebserviceData;

namespace API.LogicaNegocio
{
    public class ProyectoL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<Proyecto> GetProyectos()
        {
            try
            {

                var result = (from p in _db.SP_ADM_Seleccionar_Proyectos()

                              select new Proyecto()
                              {
                                  ID = p.ID,
                                  Descripcion = p.Descripcion,
                                  ID_Cliente = p.ID_Cliente,
                                  Cliente = p.Cliente,
                                  Horas_Estimadas = p.Horas_Estimadas,
                                  Horas_Invertidas = p.Horas_Invertidas,
                                  Monto_Total = p.Monto_Total,
                                  Estado = p.Estado,
                                  Usuario_Creacion = p.Usuario_Creacion,
                                  Usuario_Modificacion = p.Usuario_Modificacion,
                                  Fecha_Creacion = p.Fecha_Creacion,
                                  Fecha_Modificacion = p.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Proyecto>();
        }

        public Proyecto GetProyectoPorId(int idProy)
        {
            try
            {

                //var result = (from c in _db.SP_SEG_SeleccionarRol()
                //              where c.ID == idRol

                //              select new Rol()
                //              {
                //                  ID = c.ID,
                //                  Descripcion = c.Descripcion,
                //                  Estado = c.Estado,
                //                  Usuario_Creacion = c.Usuario_Creacion,
                //                  Usuario_Modificacion = c.Usuario_Modificacion,
                //                  Fecha_Creacion = c.Fecha_Creacion,
                //                  Fecha_Modificacion = c.Fecha_Modificacion

                //              }).FirstOrDefault();


                //if (result != null)
                    return new Proyecto();
            }
            catch (Exception ex)
            {
                throw;
            }
            return new Proyecto();
        }

        public bool InsertarProyecto(Proyecto proyecto)
        {
            try
            {
                //_db.SP_SEG_InsertarRol(rol.Descripcion, rol.Estado, rol.Usuario_Creacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public bool EditarProyecto(Proyecto proyecto)
        {
            try
            {
                //_db.SP_SEG_EditarRol(rol.ID, rol.Descripcion, rol.Estado, rol.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}