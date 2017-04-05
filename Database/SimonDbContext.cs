using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
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

		public List<T> List<T>() where T : Contact => Contacts.OfType<T>().ToList();

		public void Add<T>(T contact) where T: Contact{
			Contacts.Add(contact);
			SaveChanges();
		}
	}
}