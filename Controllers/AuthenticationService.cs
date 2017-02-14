using System.Collections.Generic;

namespace myResumeAPI.Controllers
{
    public class AuthenticationService
    {
        private AuthenticationService()
        {
           
        }

        private static AuthenticationService _instance;

        public static AuthenticationService Instance => _instance ?? (_instance = new AuthenticationService());
        public Dictionary<int, Session> SessionLookUp { get; } = new Dictionary<int, Session>();
    }
}