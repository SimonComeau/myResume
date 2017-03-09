using System.ComponentModel.DataAnnotations;

namespace myResumeAPI.Models {
	public class RegisterExternalBindingModel {
		[Required]
		[Display(Name = "Email")]
		public string Email { get; set; }
	}
}