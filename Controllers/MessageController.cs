using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using myResumeAPI.Factory;
using myResumeAPI.Interfaces;
using myResumeAPI.Models;
using myResumeAPI.Services;
using Microsoft.Practices.Unity;

namespace myResumeAPI.Controllers {
	public class MessageController : ApiController {
		AuthenticationService AuthenticationService { get; } = AuthenticationService.Instance;
		public MessageController() {
			MailClient = UnityService.Instance.Container.Resolve<IResumeMailClient>();
			DbContext = UnityService.Instance.Container.Resolve<IResumeDbContext>();
		}

		[HttpPost]
		[Route("api/contact")]
		public void Post([FromBody] Contact contact) {
			contact.Time = DateTime.UtcNow.ToString();
			MailClient.SendMessage(MailMessageFactory<Contact>.Create(contact));
			DbContext.Add(contact);
		}

		IResumeMailClient MailClient { get; }
		IResumeDbContext DbContext { get; }

		[HttpGet]
		[Route("api/message/list/{sessionId}")]
		public IHttpActionResult List(int sessionId) {
			if (AuthenticationService.CheckSessionIsLoggedIn(sessionId)) {
				return Json(DbContext.List<Contact>());
			}
			throw new HttpResponseException(HttpStatusCode.Unauthorized);
		}
	}
}