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

        [HttpGet]
        [Route("GetRol")]
        public List<Rol> GetRol()
        {
            return rolL.GetRol();
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


    }
}
