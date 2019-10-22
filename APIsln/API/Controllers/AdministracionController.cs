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
    [RoutePrefix("api/Administracion")]
    public class AdministracionController : ApiController
    {
        TareasL tareaL = new TareasL();

        [HttpGet]
        [Route("GetTareasEstandar")]
        public List<TareasEstandar> GetTareasEstandar()
        {
            return tareaL.GetTareasEstandar();
        }
        [HttpPost]
        [Route("InsertarTareaEstandar")]
        public IHttpActionResult InsertarRol([FromBody]TareasEstandar tarea)
        {
            if (tarea == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (tareaL.InsertarTareaEstandar(tarea))
            {
                return Ok();
            }
            return BadRequest();

        }

        [HttpPut]
        [Route("EditarTareaEstandar")]
        public IHttpActionResult EditarRol([FromBody]TareasEstandar tarea)
        {
            if (tarea == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (tareaL.EditarTareaEstandar(tarea))
            {
                return Ok();
            }
            return BadRequest();

        }
    }
}
