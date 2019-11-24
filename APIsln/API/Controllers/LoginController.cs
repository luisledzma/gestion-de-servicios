using API.WebserviceData;
using System;
using System.Net;
using System.Threading;
using System.Web.Http;
using System.Linq;
using System.Text;

namespace API.Controllers
{
    /// <summary>
    /// login controller class for authenticate users
    /// </summary>
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {

        private readonly DataServiceDataContext _db = new DataServiceDataContext();
        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }

        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            if (login == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var user = _db.SP_SEG_SeleccionarInformacionUsuario(login.Correo_Electronico,login.Contrasenna).FirstOrDefault();

           
            bool isCredentialValid = false;
            if (user != null)
            {
                isCredentialValid = true;
            }
            else
            {
                isCredentialValid = false;
            }

          

            //TODO: Validate credentials Correctly, this code is only for demo !!

            if (isCredentialValid)
            {
                StringBuilder info = new StringBuilder();
                info.Append(user.Correo_Electronico+";");
                info.Append(user.Contrasenna+";");
                info.Append(user.Usuario + ";");
                info.Append(user.Nombre + ";");
                info.Append(user.Telefono + ";");
                info.Append(user.Estado + ";");
                info.Append(user.Rol + ";");
                info.Append(user.Usuario_Creacion + ";");
                info.Append(user.Usuario_Modificacion + ";");
                info.Append(user.Fecha_Creacion + ";");
                info.Append(user.Fecha_Modificacion);
                var token = TokenGenerator.GenerateTokenJwt(info.ToString());
                return Ok(token);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
