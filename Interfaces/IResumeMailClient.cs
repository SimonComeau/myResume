using System.Net.Mail;

namespace myResumeAPI.Interfaces {
	public interface IResumeMailClient {
		void SendMessage(MailMessage message);
	}
}