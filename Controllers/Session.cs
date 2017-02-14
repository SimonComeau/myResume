using System;

namespace myResumeAPI.Controllers
{
    public class Session
    {
        public bool IsLoggedIn { get; set; }
        public Guid AuthToken { get; set; }
        public int Id { get; set; }
    }
}