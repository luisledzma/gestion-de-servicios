using API.WebserviceData;
using System;
using System.Net;
using System.Threading;
using System.Web.Http;
using System.Linq;


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

            var user = _db.tbInternalUsers.Where(x => x.UserEmail == login.UserEmail && x.UsrPasw == login.UsrPasw).FirstOrDefault();

           
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
                var token = TokenGenerator.GenerateTokenJwt(login.UserEmail);
                return Ok(token);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
