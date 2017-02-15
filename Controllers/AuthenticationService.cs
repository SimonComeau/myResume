using System;
using System.Collections.Generic;

namespace myResumeAPI.Controllers
{
    public class AuthenticationService
    {
        private AuthenticationService()
        {
            IsLoggedIn = false;
        }

        private static AuthenticationService _instance;

        public static AuthenticationService Instance => _instance ?? (_instance = new AuthenticationService());
        public bool IsLoggedIn { get; set; }
        public Dictionary<int, Guid> SessionLookUp { get; } = new Dictionary<int, Guid>();
    }
}