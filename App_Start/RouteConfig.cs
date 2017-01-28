using System.Web.Mvc;
using System.Web.Routing;

namespace myResumeAPI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapPageRoute("DefaultRoute", "{*anything}", "~/index.html");
        }
    }
}
