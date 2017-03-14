using myResumeAPI.Models;

namespace myResumeAPI.Interfaces {
	public interface IResumeDbContext {
		void Add(Contact contact);
	}
}