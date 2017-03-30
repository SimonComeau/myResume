using System.Configuration;
using System.Data.Entity;
using myResumeAPI.Interfaces;
using myResumeAPI.Models;
using Configuration = myResumeAPI.Migrations.Configuration;

namespace myResumeAPI.Database {
	public class SimonDbContext : DbContext, IResumeDbContext {
		// ReSharper disable once MemberCanBePrivate.Global
		// This can NEVER be made private
		public DbSet<Contact> Contacts { get; set; }

		public SimonDbContext() {
			Database.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["SimonDbContext"].ConnectionString;
			Database.CreateIfNotExists();
		}

		public static SimonDbContext Create() {
			System.Data.Entity.Database.SetInitializer(new MigrateDatabaseToLatestVersion<SimonDbContext, Configuration>());
			return new SimonDbContext();
		}

		public void Add(Contact contact) {
			Contacts.Add(contact);
			SaveChanges();
		}
	}
}