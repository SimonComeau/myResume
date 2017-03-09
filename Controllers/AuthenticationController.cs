using System.Net;
using System.Web.Http;
using myResumeAPI.Services;

namespace myResumeAPI.Controllers {
	public class AuthenticationController : ApiController {
		AuthenticationService AuthenticationService { get; } = AuthenticationService.Instance;

		[HttpPost]
		[Route("api/authentication/login/{sessionId}")]
		public IHttpActionResult Login([FromBody] dynamic user, int sessionId) {
			if (!AuthenticationService.ValidateLoginCredentials(user, sessionId)) {
				throw new HttpResponseException(HttpStatusCode.Unauthorized);
			}
			AuthenticationService.LoginSession(sessionId);
			return Ok();
		}

		[HttpPost]
		[Route("api/authentication/logout/{sessionId}")]
		public IHttpActionResult Logout(int sessionId) {
			AuthenticationService.LogoutSession(sessionId);
			return Ok();
		}

		[HttpGet]
		[Route("api/authentication/isloggedin/{sessionId}")]
		public IHttpActionResult IsLoggedIn(int sessionId) => Ok(AuthenticationService.CheckSessionIsLoggedIn(sessionId));

		[HttpGet]
		[Route("api/authentication/getauthtoken/{sessionId}")]
		public IHttpActionResult GetAuthToken(int sessionId) => Ok(AuthenticationService.GetAuthToken(sessionId));
	}
}