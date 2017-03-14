﻿using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;

namespace myResumeAPI {
	public static class WebApiConfig {
		public static void Register(HttpConfiguration config) {
			var corsAttribute = new EnableCorsAttribute("http://localhost:9060", "*", "*");
			config.EnableCors(corsAttribute);
			// Web API configuration and services
			// Configure Web API to use only bearer token authentication.
			config.SuppressDefaultHostAuthentication();
			config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

			// Web API routes
			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{action}/{id}", new {id = RouteParameter.Optional});
		}
	}
}