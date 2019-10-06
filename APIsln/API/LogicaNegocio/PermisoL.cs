using API.Controllers;
using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.LogicaNegocio
{
    public class PermisoL
    {
        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<Permiso> GetPermisosPorRol(int idRol)
        {
            try
            {

                var result = (from c in _db.SP_SEG_SeleccionarSeccionesPorRol(idRol)

                              select new Permiso()
                              {
                                  ID_Seccion = c.ID_Seccion,
                                  ID_Rol = c.ID_Rol,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Permiso>();
        }
        public List<Menu> GetMenusPorRol(int idRol)
        {
            try
            {

                var result = (from c in _db.SP_SEG_SeleccionarMenuPorRol(idRol)

                              select new Menu()
                              {
                                  ID = c.ID,
                                  Descripcion = c.Descripcion,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion

                              }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<Menu>();
        }
        
    }
}