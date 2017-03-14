using Microsoft.Practices.Unity;

namespace myResumeAPI.Services {
	public class UnityService {
		static UnityService _instance;

		UnityService() {}

		public static UnityService Instance => _instance ?? (_instance = new UnityService());
		public IUnityContainer Container { get; set; }
	}
}