using System.Web.Routing;

namespace myResumeAPI {
	public class RouteConfig {
		public static void RegisterRoutes(RouteCollection routes) {
			routes.MapPageRoute("DefaultRoute", "{*anything}", "~/index.html");
		}
	}
}