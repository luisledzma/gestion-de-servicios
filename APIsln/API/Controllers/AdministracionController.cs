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
        ProyectoL proL = new ProyectoL();
        ContratoL conL = new ContratoL();
        GarantiaL garL = new GarantiaL();


        // ---------------------------------------
        // -------------TAREAS ESTANDAR-----------
        [HttpGet]
        [Route("GetTareasEstandar")]
        public List<TareasEstandar> GetTareasEstandar(string usuarioConsulta)
        {
            return tareaL.GetTareasEstandar(usuarioConsulta);
        }
        [HttpGet]
        [Route("GetTareasEstandarActivas")]
        public List<TareasEstandar> GetTareasEstandarActivas()
        {
            return tareaL.GetTareasEstandarActivas();
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

        // ---------------------------------------
        // --------------CLIENTES-----------------
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
        [HttpPost]
        [Route("EditarCliente")]
        public IHttpActionResult EditarCliente([FromBody]ClienteC cliente)
        {
            if (cliente == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (cliL.EditarCliente(cliente))
            {
                return Ok();
            }
            return BadRequest();

        }
        [HttpGet]
        [Route("GetClientesERP")]
        public List<ClienteC> GetClientesERP()
        {
            return cliL.GetClientesERP();
        }

        // ----------------------------------------
        [HttpGet]
        [Route("GetTipoReportes")]
        public List<TipoReporte> GetTipoReportes()
        {
            return repL.GetTipoReportes();
        }

        // ----------------------------------------
        // --------------PROYECTOS-----------------
        [HttpGet]
        [Route("GetProyectos")]
        public List<Proyecto> GetProyectos(string usuarioConsulta)
        {
            return proL.GetProyectos(usuarioConsulta);
        }
        [HttpGet]
        [Route("GetProyectosActivos")]
        public List<Proyecto> GetProyectosActivos()
        {
            return proL.GetProyectosActivos();
        }        
        [HttpGet]
        [Route("GetProyectoPorId")]
        public Proyecto GetProyectoPorId(int idProy)
        {
            return proL.GetProyectoPorId(idProy);
        }
        [HttpPost]
        [Route("InsertarProyecto")]
        public bool InsertarProyecto([FromBody]Proyecto proyecto)
        {
            if (proyecto == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (proL.InsertarProyecto(proyecto))
            {
                return true;
            }
            return false;

        }
        [HttpPut]
        [Route("EditarProyecto")]
        public bool EditarProyecto([FromBody]Proyecto proyecto)
        {
            if (proyecto == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (proL.EditarProyecto(proyecto))
            {
                return true;
            }
            return false;

        }

        // ----------------------------------------
        // ------------ETAPAS PROYECTOS------------

        [HttpGet]
        [Route("GetEtapasProyectoPorProyecto")]
        public List<EtapaProyecto> GetEtapasProyectoPorProyecto(int idProy,string usuarioConsulta)
        {
            return proL.GetEtapasProyectoPorProyecto(idProy, usuarioConsulta);
        }
        [HttpGet]
        [Route("GetEtapasProyectoActivasPorProyecto")]
        public List<EtapaProyecto> GetEtapasProyectoActivasPorProyecto(int idProy)
        {
            return proL.GetEtapasProyectoActivasPorProyecto(idProy);
        }        
        [HttpPost]
        [Route("InsertarEtapaProyecto")]
        public bool InsertarEtapaProyecto([FromBody]EtapaProyecto eProyecto)
        {
            if (eProyecto == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (proL.InsertarEtapaProyecto(eProyecto))
            {
                return true;
            }
            return false;
        }
        [HttpPut]
        [Route("EditarEtapaProyecto")]
        public bool EditarEtapaProyecto([FromBody]EtapaProyecto eProyecto)
        {
            if (eProyecto == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (proL.EditarEtapaProyecto(eProyecto))
            {
                return true;
            }
            return false;
        }

        // ----------------------------------------
        // --------------REPORTES------------------
        [HttpGet]
        [Route("GetReportes")]
        public List<Reporte> GetReportes(string usuarioConsulta)
        {
            return repL.GetReportes(usuarioConsulta);
        }
        [HttpPost]
        [Route("InsertarReporte")]
        public bool InsertarReporte([FromBody]Reporte reporte)
        {
            if (reporte == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (repL.InsertarReporte(reporte))
            {
                return true;
            }
            return false;

        }
        [HttpPut]
        [Route("EditarReporte")]
        public bool EditarReporte([FromBody]Reporte reporte)
        {
            if (reporte == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (repL.EditarReporte(reporte))
            {
                return true;
            }
            return false;
        }
        [HttpPut]
        [Route("EditarReporteRespuestaCorreo")]
        public bool EditarReporteRespuestaCorreo([FromBody]RespuestaCorreo respuesta)
        {
            if (respuesta == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (repL.EditarReporteRespuestaCorreo(respuesta))
            {
                return true;
            }
            return false;
        }
        // ------------------------------------------
        // ----------------CONTRATOS-----------------
        [HttpGet]
        [Route("GetContratos")]
        public List<Contrato> GetContratos(string usuarioConsulta)
        {
            return conL.GetContratos(usuarioConsulta);
        }
        [HttpPost]
        [Route("InsertarContrato")]
        public bool InsertarContrato([FromBody]Contrato contrato)
        {
            if (contrato == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (conL.InsertarContrato(contrato))
            {
                return true;
            }
            return false;
        }
        [HttpPut]
        [Route("EditarContrato")]
        public bool EditarContrato([FromBody]Contrato contrato)
        {
            if (contrato == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (conL.EditarContrato(contrato))
            {
                return true;
            }
            return false;

        }
        [HttpGet]
        [Route("GetContratosActivos")]
        public List<Contrato> GetContratosActivos()
        {
            return conL.GetContratosActivos();
        }

        [HttpGet]
        [Route("GetGarantias")]
        public List<Garantia> GetGarantias()
        {
            return garL.GetGaratias();
        }

        [HttpPost]
        [Route("CierreDeMes")]
        public bool CierreDeMes([FromBody]Contrato contrato)
        {
            if (contrato == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (conL.CierreDeMes(contrato))
            {
                return true;
            }
            return false;
        }
    }
}
