using System;

namespace myResumeAPI.Models {
	public class Session {
		public bool IsLoggedIn { get; set; }
		public Guid AuthToken { get; set; }
		public int Id { get; set; }
	}
}