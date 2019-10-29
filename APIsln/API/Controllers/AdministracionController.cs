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
        ReporteL repL = new ReporteL();
        ClienteL cliL = new ClienteL();

        [HttpGet]
        [Route("GetTareasEstandar")]
        public List<TareasEstandar> GetTareasEstandar()
        {
            return tareaL.GetTareasEstandar();
        }
        [HttpPost]
        [Route("InsertarTareaEstandar")]
        public IHttpActionResult InsertarTareaEstandar([FromBody]TareasEstandar tarea)
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
        public IHttpActionResult EditarTareaEstandar([FromBody]TareasEstandar tarea)
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
        [HttpGet]
        [Route("GetClientes")]
        public List<ClienteC> GetClientes()
        {
            return cliL.GetClientes();
        }
        [HttpPost]
        [Route("InsertarCliente")]
        public IHttpActionResult InsertarCliente([FromBody]ClienteC cliente)
        {
            if (cliente == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (cliL.InsertarCliente(cliente))
            {
                return Ok();
            }
            return BadRequest();

        }
        [HttpGet]
        [Route("GetTipoReportes")]
        public List<TipoReporte> GetTipoReportes()
        {
            return repL.GetTipoReportes();
        }
        [HttpGet]
        [Route("GetReportes")]
        public List<Reporte> GetReportes()
        {
            return repL.GetReportes();
        }
        [HttpPost]
        [Route("InsertarReporte")]
        public IHttpActionResult InsertarReporte([FromBody]Reporte reporte)
        {
            if (reporte == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (repL.InsertarReporte(reporte))
            {
                return Ok();
            }
            return BadRequest();

        }
    }
}
