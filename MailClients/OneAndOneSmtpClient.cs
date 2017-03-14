using System.Configuration;
using System.Net;
using System.Net.Mail;
using myResumeAPI.Interfaces;

namespace myResumeAPI.MailClients
{
	public class OneAndOneSmtpClient : SmtpClient, IResumeMailClient
	{
		public OneAndOneSmtpClient()
		{
			Port = 587;
			EnableSsl = true;
			Host = "smtp.1and1.com";
			Credentials = GetNetworkCredential();
		}

		NetworkCredential GetNetworkCredential()
		{
			var userName = ConfigurationManager.AppSettings.Get("SmtpUserName");
			var password = ConfigurationManager.AppSettings.Get("SmtpPassword");
			return new NetworkCredential(userName, password);
		}

		public void SendMessage(MailMessage message) => Send(message);
	}
}