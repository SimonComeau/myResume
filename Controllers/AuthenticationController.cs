using System;
using System.Configuration;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace myResumeAPI.Controllers
{
    public class AuthenticationController : ApiController
    {
        [HttpPost]
        [Route("api/authentication/login/{sessionId}")]
        public IHttpActionResult Login([FromBody] dynamic user, int sessionId)
        {
            var userName = ConfigurationManager.AppSettings.Get("AdminUsername");
            var password = ConfigurationManager.AppSettings.Get("AdminPassword");
            var hasher = SHA512.Create();
            var userSalt = Encoding.UTF8.GetBytes(userName + RetreiveAuthToken(sessionId));
            var passwordSalt = Encoding.UTF8.GetBytes(password + RetreiveAuthToken(sessionId));
            var expectedUsername = BitConverter.ToString(hasher.ComputeHash(userSalt)).Replace("-", "").ToLower();
            var expectedPassword = BitConverter.ToString(hasher.ComputeHash(passwordSalt)).Replace("-", "").ToLower();
            if (user.username.ToString() == expectedUsername && user.password.ToString() == expectedPassword)
            {
                AuthenticationService.Instance.SessionLookUp[sessionId].IsLoggedIn = true;
                return Ok();
            }
            throw new HttpResponseException(HttpStatusCode.Unauthorized);
        }

        [HttpGet]
        [Route("api/authentication/isloggedin/{sessionId}")]
        public IHttpActionResult IsLoggedIn(int sessionId)
        {
            if (AuthenticationService.Instance.SessionLookUp.ContainsKey(sessionId))
            {
                var session = AuthenticationService.Instance.SessionLookUp[sessionId];
                return Ok(session.IsLoggedIn);
            }
            return Ok(false);
        }

        [HttpPost]
        [Route("api/authentication/logout/{sessionId}")]
        public IHttpActionResult Logout(int sessionId)
        {
            if (AuthenticationService.Instance.SessionLookUp.ContainsKey(sessionId))
            {
                AuthenticationService.Instance.SessionLookUp[sessionId].IsLoggedIn = false;
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/authentication/getauthtoken/{sessionId}")]
        public IHttpActionResult GetAuthToken(int sessionId)
        {
            var guid = RetreiveAuthToken(sessionId);
            return Ok(guid.ToString());
        }

        private Guid RetreiveAuthToken(int sessionId)
        {
            if (AuthenticationService.Instance.SessionLookUp.ContainsKey(sessionId))
            {
                var session = AuthenticationService.Instance.SessionLookUp[sessionId];
                return session.AuthToken;
            }
            var guid = Guid.NewGuid();
            var newSession = new Session
            {
                IsLoggedIn = false,
                AuthToken = guid,
                Id = sessionId
            };
            AuthenticationService.Instance.SessionLookUp.Add(sessionId, newSession);
            return guid;
        }
    }
}