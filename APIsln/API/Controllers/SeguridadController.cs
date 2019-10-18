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
    [RoutePrefix("api/Seguridad")]
    public class SeguridadController : ApiController
    {

        RolL rolL = new RolL();
        UsuarioL usrL = new UsuarioL();

        [HttpGet]
        [Route("GetRol")]
        public List<Rol> GetRol()
        {
            return rolL.GetRol();
        }

        [HttpGet]
        [Route("GetRolPorId")]
        public Rol GetRolPorId(int idRol)
        {
            return rolL.GetRolPorId(idRol);
        }



        [HttpPost]
        [Route("InsertarRol")]
        public IHttpActionResult InsertarRol([FromBody]Rol rol)
        {
            if (rol == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (rolL.InsertarRol(rol))
            {
                return Ok();
            }
            return BadRequest();    

        }

        [HttpPut]
        [Route("EditarRol")]
        public IHttpActionResult EditarRol([FromBody]Rol rol)
        {
            if (rol == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (rolL.EditarRol(rol))
            {
                return Ok();
            }
            return BadRequest();

        }

        [HttpGet]
        [Route("GetUsuarios")]
        public List<LoginRequest> GetUsuarios()
        {
            return usrL.GetUsuarios();
        }

        [HttpPost]
        [Route("InsertarUsuario")]
        public IHttpActionResult InsertarUsuario([FromBody]LoginRequest usuario)
        {
            if (usuario == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (usrL.InsertarUsuario(usuario))
            {
                return Ok();
            }
            return BadRequest();

        }
        [HttpPut]
        [Route("EditarUsuario")]
        public IHttpActionResult EditarUsuario([FromBody]LoginRequest usuario)
        {
            if (usuario == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (usrL.EditarUsuario(usuario))
            {
                return Ok();
            }
            return BadRequest();

        }
        

    }
}
