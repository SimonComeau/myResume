using System.ComponentModel.DataAnnotations;

namespace myResumeAPI.Models {
	public class Contact {
		public string Name { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string Message { get; set; }
		[Key]
		public int Id { get; set; }
	}
}