using API.Controllers;
using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.LogicaNegocio
{
    public class UsuarioL
    {

        private readonly DataServiceDataContext _db = new DataServiceDataContext();

        public List<LoginRequest> GetUsuarios()
        {
            try
            {

                var result = (from c in _db.SP_SEG_Seleccionar_Usuarios()

                              select new LoginRequest()
                              {
                                  Usuario = c.Usuario,
                                  Correo_Electronico = c.Correo_Electronico,
                                  Nombre = c.Nombre,
                                  Contrasenna = c.Contrasenna,
                                  Telefono = c.Telefono,
                                  Rol = c.Rol,
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
            return new List<LoginRequest>();
        }

    }
}