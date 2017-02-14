using myResumeAPI.Models;
using System;
using System.Net.Mail;
using System.Web.Http;
using myResumeAPI.Database;
using myResumeAPI.MailClients;

namespace myResumeAPI.Controllers
{
    public class ContactController : ApiController
    {
        [HttpPost]
        [Route("api/contact")]
        public void Post([FromBody] Contact contact)
        {
            var mailClient = new OneAndOneSmtpClient();
            var message = GetMailMessageFromContact(contact);
            mailClient.Send(message);
            using (var db = new SimonDbContext())
            {
                db.Contacts.Add(contact);
                db.SaveChanges();
            }
        }
        //[HttpGet]
        //public IHttpActionResult Get()
        //{
        //    return Ok("piggy oink oink");
        //}

        private static MailMessage GetMailMessageFromContact(Contact contact)
        {
            var fromAddress = new MailAddress(contact.Email);
            var message = new MailMessage
            {
                From = fromAddress,
                Subject = $"Contact {contact.Name} has sent you a new message.",
                Body = $"{contact.Message}{Environment.NewLine}{contact.PhoneNumber}"
            };
            message.To.Add("nomismoc@gmail.com");
            message.To.Add("contact@simoncomeau.com");
            return message;
        }
    }
}