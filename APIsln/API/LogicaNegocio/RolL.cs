using API.Controllers;
using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.LogicaNegocio
{
    public class RolL
    {

        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<Rol> GetRol(string usuarioConsulta)
        {
            try
            {
                
                var result = (from c in _db.SP_SEG_SeleccionarRol(usuarioConsulta)

                              select new Rol()
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
            return new List<Rol>();
        }

        public Rol GetRolPorId(int idRol)
        {
            try
            {

                var result = (from c in _db.SP_SEG_SeleccionarRolPorId(idRol)

                              select new Rol()
                              {
                                  ID = c.ID,
                                  Descripcion = c.Descripcion,
                                  Estado = c.Estado,
                                  Usuario_Creacion = c.Usuario_Creacion,
                                  Usuario_Modificacion = c.Usuario_Modificacion,
                                  Fecha_Creacion = c.Fecha_Creacion,
                                  Fecha_Modificacion = c.Fecha_Modificacion

                              }).FirstOrDefault();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new Rol();
        }

        public bool InsertarRol(Rol rol)
        {
            try
            {
                _db.SP_SEG_InsertarRol(rol.Descripcion, rol.Estado, rol.Usuario_Creacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public bool EditarRol(Rol rol)
        {
            try
            {
                _db.SP_SEG_EditarRol(rol.ID,rol.Descripcion, rol.Estado,rol.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }






    }
}