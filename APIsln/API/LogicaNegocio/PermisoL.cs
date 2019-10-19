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
        public List<Menu> GetMenus()
        {
            try
            {

                var result = (from m in _db.SP_SEG_Seleccionar_Menus()

                              select new Menu()
                              {
                                  ID = m.ID,
                                  Descripcion = m.Descripcion,
                                  Estado = m.Estado,
                                  Usuario_Creacion = m.Usuario_Creacion,
                                  Usuario_Modificacion = m.Usuario_Modificacion,
                                  Fecha_Creacion = m.Fecha_Creacion,
                                  Fecha_Modificacion = m.Fecha_Modificacion

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
        public SettingPermisoDto GetPermisosPorRolyMenu(int idMenu, int idRol)
        {
            SettingPermisoDto result = new SettingPermisoDto();
            try
            {
                result.Source = (from p in _db.SP_SEG_Seleccionar_Permiso_Por_Rol_Y_Menu(idMenu, idRol, 'I')
                                 select new Permiso()
                                 {
                                     ID = p.ID,
                                     ID_Seccion=p.ID_Seccion,
                                     ID_Menu=p.ID_Menu,
                                     ID_Rol=p.ID_Rol,
                                     Descripcion_Seccion=p.Descripcion,
                                     Estado=p.Estado,
                                     Fecha_Creacion=p.Fecha_Creacion,
                                     Fecha_Modificacion=p.Fecha_Modificacion,
                                     Usuario_Creacion=p.Usuario_Creacion,
                                     Usuario_Modificacion=p.Usuario_Modificacion
                                 }).ToList();

                result.Target = (from p in _db.SP_SEG_Seleccionar_Permiso_Por_Rol_Y_Menu(idMenu, idRol, 'A')
                                 select new Permiso()
                                 {
                                     ID = p.ID,
                                     ID_Seccion = p.ID_Seccion,
                                     ID_Menu = p.ID_Menu,
                                     ID_Rol = p.ID_Rol,
                                     Descripcion_Seccion = p.Descripcion,
                                     Estado = p.Estado,
                                     Fecha_Creacion = p.Fecha_Creacion,
                                     Fecha_Modificacion = p.Fecha_Modificacion,
                                     Usuario_Creacion = p.Usuario_Creacion,
                                     Usuario_Modificacion = p.Usuario_Modificacion
                                 }).ToList();


                if (result != null)
                    return result;
            }
            catch (Exception ex)
            {
                throw;
            }
            return new SettingPermisoDto();
        }
        public bool UpdatePermisosLists(SettingPermisoDto ms)
        {
            try
            {
                int order = 0;
                int valueReturned = 0;
                DateTime dateMod = DateTime.Now;
                foreach (Permiso item in ms.Target)
                {
                    item.Fecha_Modificacion = dateMod;
                    _db.SP_SEG_Actualizar_Lista_Permisos(item.Estado, item.ID, item.Usuario_Modificacion, item.Fecha_Modificacion);
                    order = order + 1;
                }
                order = 0;
                foreach (Permiso item in ms.Source)
                {
                    item.Fecha_Modificacion = dateMod;
                    _db.SP_SEG_Actualizar_Lista_Permisos(item.Estado, item.ID, item.Usuario_Modificacion, item.Fecha_Modificacion);
                    order = order + 1;
                }

                if (valueReturned < 0)
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
    }
}