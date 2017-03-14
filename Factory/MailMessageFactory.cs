using System;
using System.Net.Mail;
using myResumeAPI.Models;

namespace myResumeAPI.Factory {
	public class MailMessageFactory<T> where T : Contact { 
		public static MailMessage Create(T contact) 
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