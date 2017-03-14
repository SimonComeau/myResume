using myResumeAPI.Database;
using myResumeAPI.Interfaces;
using myResumeAPI.MailClients;
using myResumeAPI.Services;
using Microsoft.Practices.Unity;

namespace myResumeAPI {
	public class UnityConfig {
		public static void RegisterContainer() {
			UnityService.Instance.Container = new UnityContainer();
			UnityService.Instance.Container.RegisterType<IResumeMailClient, OneAndOneSmtpClient>();
			UnityService.Instance.Container.RegisterType<IResumeDbContext, SimonDbContext>();
		}
	}
}