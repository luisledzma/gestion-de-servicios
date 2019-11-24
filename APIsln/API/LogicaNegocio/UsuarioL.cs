using API.Controllers;
using API.WebserviceData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;

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
                                  ID = c.ID,
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
        public bool ConsultarUsuarioERP(string idUsuario)
        {
            try
            {
                var userERP = _db.SP_SEG_Consultar_Usuario_ERP(idUsuario).FirstOrDefault();
                
                if (userERP != null)
                {
                    var user = _db.SP_SEG_Consultar_Usuario(idUsuario).FirstOrDefault();
                    if (user != null)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }

                }
                else
                {
                    return false;
                }

                
            }
            catch (Exception)
            {
                throw;
                return false;
            }
        }
        public bool InsertarUsuario(LoginRequest usuario)
        {
            try
            {
                _db.SP_SEG_InsertarUsuario(usuario.Usuario, usuario.Contrasenna, usuario.Nombre, usuario.Correo_Electronico, usuario.Telefono, usuario.Estado, usuario.Rol, usuario.Usuario_Creacion, usuario.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;              
            }
        }
        public bool EditarUsuario(LoginRequest usuario)
        {
            try
            {
                _db.SP_SEG_EditarUsuario(usuario.ID, usuario.Usuario, usuario.Contrasenna, usuario.Nombre,usuario.Correo_Electronico,usuario.Telefono,usuario.Estado,usuario.Rol,usuario.Usuario_Modificacion);
                return true;
            }
            catch (Exception)
            {
                throw;
                return false;
            }
        }  
    }
}