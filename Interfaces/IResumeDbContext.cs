using System.Collections.Generic;
using myResumeAPI.Models;

namespace myResumeAPI.Interfaces {
	public interface IResumeDbContext {
		void Add<T>(T contact) where T: Contact;
		List<T> List<T>() where T : Contact;
	}
}