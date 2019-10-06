using API.LogicaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/Permiso")]
    public class PermisoController : ApiController
    {
        PermisoL permisos = new PermisoL();
        
        [HttpGet]
        [Route("GetPermisosPorRol")]
        public List<Permiso> GetPermisosPorRol(int idRol)
        {
            return permisos.GetPermisosPorRol(idRol);
        }
        [HttpGet]
        [Route("GetMenusPorRol")]
        public List<Menu> GetMenusPorRol(int idRol)
        {
            return permisos.GetMenusPorRol(idRol);
        }
    }
}
