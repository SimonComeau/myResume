using myResumeAPI.Models;
using System;
using System.Diagnostics;
using System.Net.Mail;
using System.Web.Http;
using myResumeAPI.Database;
using myResumeAPI.MailClients;

namespace myResumeAPI.Controllers
{
    public class ContactController : ApiController
    {
        // POST api/contact
        [HttpPost]
        public void Post([FromBody] Contact contact)
        {
            Debugger.Launch();
            var mailClient = new OneAndOneSmtpClient();
            var message = GetMailMessageFromContact(contact);
            mailClient.Send(message);
            using (var db = new SimonDbContext())
            {
                db.Contacts.Add(contact);
                db.SaveChanges();
            }
        }
        
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
            message.To.Add("codencrazy@gmail.com");
            return message;
        }
    }
}