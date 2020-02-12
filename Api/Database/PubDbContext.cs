using Microsoft.EntityFrameworkCore;
using PublishPlatform.Api.Models;
using System;
using System.Threading.Tasks;
using WeihanLi.EntityFramework;

namespace PublishPlatform.Api.Database
{
    public class PubDbContext : DbContextBase
    {
        public PubDbContext(DbContextOptions<PubDbContext> options) : base(options)
        {
        }

        protected override Task BeforeSaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.State == EntityState.Added)
                {
                    var idEntry = entry.Property("Id");
                    if (idEntry != null && Guid.TryParse(idEntry.CurrentValue?.ToString(), out var idVal) && idVal == Guid.Empty)
                    {
                        idEntry.CurrentValue = Guid.NewGuid();
                    }
                    // auto set CreatedAt
                    entry.Property("CreatedAt").CurrentValue = DateTimeOffset.UtcNow;
                }
            }

            return base.BeforeSaveChanges();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Verification> Verifications { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Notice> Notices { get; set; }

        public DbSet<AuditLog> AuditLogs { get; set; }
    }
}