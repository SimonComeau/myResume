using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace myResumeAPI.Models {
	public class Contact {
		[JsonProperty(PropertyName = "name")]
		public string Name { get; set; }
		[JsonProperty(PropertyName = "email")]
		public string Email { get; set; }
		[Column("PhoneNumber")]
		[JsonProperty(PropertyName = "phone")]
		public string Phone { get; set; }
		[JsonProperty(PropertyName = "messageSummary")]
		public string Message { get; set; }
		[JsonProperty(PropertyName = "time")]
		public string Time { get; set; }
		[Key]
		public int Id { get; set; }
	}
}