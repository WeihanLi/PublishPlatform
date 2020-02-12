using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PublishPlatform.Api.Database;
using WeihanLi.EntityFramework;

namespace PublishPlatform.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        protected readonly ILogger Logger;
        protected readonly IEFRepositoryFactory<PubDbContext> RepositoryFactory;

        protected ApiControllerBase(ILoggerFactory loggerFactory, IEFRepositoryFactory<PubDbContext> repositoryFactory)
        {
            Logger = loggerFactory.CreateLogger(GetType());
            RepositoryFactory = repositoryFactory;
        }
    }
}