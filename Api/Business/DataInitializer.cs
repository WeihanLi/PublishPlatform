using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PublishPlatform.Api.Database;
using PublishPlatform.Api.Models;

namespace PublishPlatform.Api.Business
{
    public static class DataInitializer
    {
        public static IServiceProvider InitData(this IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                using (var dbContext = scope.ServiceProvider.GetRequiredService<PubDbContext>())
                {
                    dbContext.Database.EnsureCreated();

                    if (dbContext.Notices.AsNoTracking().Any())
                    {
                        return serviceProvider;
                    }

                    Guid uid = Guid.NewGuid(), uid2 = Guid.NewGuid();
                    var phoneNum = "15601252222";
                    dbContext.Users.Add(new User()
                    {
                        Id = uid,
                        CreatedAt = DateTimeOffset.UtcNow,
                        DisplayName = "天天向上卡索",
                        UserName = "liweihan",
                        PhoneNumber = phoneNum,
                        IsVerified = true,
                    });
                    dbContext.Users.Add(new User()
                    {
                        Id = uid2,
                        CreatedAt = DateTimeOffset.UtcNow,
                        DisplayName = "Alice",
                        UserName = "Alice",
                        IsVerified = false,
                    });

                    //
                    dbContext.Verifications.Add(new Verification()
                    {
                        RealName = "Li Weihan",
                        CompanyName = "AmazingStudio",
                        PhoneNumber = phoneNum,
                        Status = ReviewStatus.Reviewed,
                        UserId = uid,
                    });
                    dbContext.Verifications.Add(new Verification()
                    {
                        Status = ReviewStatus.UnReviewed,
                        UserId = uid,
                    });

                    dbContext.Notices.Add(new Notice()
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTimeOffset.UtcNow,
                        Title = "测试公告",
                        Path = "test",
                        Status = ReviewStatus.Reviewed,
                        ViewCount = 10,
                        Detail = "<h3>这是一个测试公告</h3>"
                    });

                    dbContext.Projects.Add(new Project()
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTimeOffset.UtcNow,
                        Begin = DateTimeOffset.UtcNow,
                        End = DateTimeOffset.UtcNow.AddMonths(1),
                        PublishedAt = DateTimeOffset.UtcNow,
                        Name = "测试项目001",
                        Description = "<p>这里是项目介绍...</p><p>这里是项目介绍...</p><p>这里是项目介绍...</p>",
                        Status = ProjectStatus.NotPublished,
                    });
                    dbContext.Projects.Add(new Project()
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTimeOffset.UtcNow,
                        Begin = DateTimeOffset.UtcNow,
                        End = DateTimeOffset.UtcNow.AddMonths(1),
                        PublishedAt = DateTimeOffset.UtcNow,
                        Name = "测试项目002",
                        Description = "<p>这里是项目介绍...</p><p>这里是项目介绍...</p><p>这里是项目介绍...</p>",
                        Status = ProjectStatus.Published,
                    });
                    dbContext.Projects.Add(new Project()
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTimeOffset.UtcNow,
                        Begin = DateTimeOffset.UtcNow,
                        End = DateTimeOffset.UtcNow.AddMonths(1),
                        PublishedAt = DateTimeOffset.UtcNow,
                        Name = "测试项目003",
                        Description = "<p>这里是项目介绍...</p><p>这里是项目介绍...</p><p>这里是项目介绍...</p>",
                        Status = ProjectStatus.Completed,
                    });
                    dbContext.Projects.Add(new Project()
                    {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTimeOffset.UtcNow,
                        Begin = DateTimeOffset.UtcNow,
                        End = DateTimeOffset.UtcNow.AddMonths(1),
                        PublishedAt = DateTimeOffset.UtcNow,
                        Name = "测试项目004",
                        Description = "<p>这里是项目介绍...</p><p>这里是项目介绍...</p><p>这里是项目介绍...</p>",
                        Status = ProjectStatus.Dropped,
                    });

                    dbContext.SaveChanges();
                }
            }
            return serviceProvider;
        }
    }
}
