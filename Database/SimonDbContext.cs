using System.Configuration;
using System.Data.Entity;
using myResumeAPI.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Configuration = myResumeAPI.Migrations.Configuration;

namespace myResumeAPI.Database
{
    public class SimonDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Contact> Contacts { get; set; }

        public SimonDbContext()
        {
            Database.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["SimonDbContext"].ConnectionString;
            Database.CreateIfNotExists();
        }

        public static SimonDbContext Create()
        {
            System.Data.Entity.Database.SetInitializer(new MigrateDatabaseToLatestVersion<SimonDbContext, Configuration>());
            return new SimonDbContext();
        }
    }
}