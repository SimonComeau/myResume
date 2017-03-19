using System.Web.Http;
using myResumeAPI.Factory;
using myResumeAPI.Interfaces;
using myResumeAPI.Models;
using myResumeAPI.Services;
using Microsoft.Practices.Unity;

namespace myResumeAPI.Controllers {
	public class MessageController : ApiController {
		public MessageController() {
			MailClient = UnityService.Instance.Container.Resolve<IResumeMailClient>();
			DbContext = UnityService.Instance.Container.Resolve<IResumeDbContext>();
		}

		[HttpPost]
		[Route("api/contact")]
		public void Post([FromBody] Contact contact) {
			MailClient.SendMessage(MailMessageFactory<Contact>.Create(contact));
			DbContext.Add(contact);
		}

		IResumeMailClient MailClient { get; }
		IResumeDbContext DbContext { get; }

		//[HttpGet]
		//public IHttpActionResult Get()
		//{
		//    return Ok("piggy oink oink");
		//}
	}
}