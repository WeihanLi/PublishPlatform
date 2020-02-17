using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PublishPlatform.Api.Database;
using PublishPlatform.Api.Models;
using WeihanLi.EntityFramework;
using WeihanLi.Web.Extensions;

namespace PublishPlatform.Api.Controllers
{
    public class ProjectAppliesController : ApiControllerBase
    {
        private readonly IEFRepository<PubDbContext, ProjectApply> _repository;

        public ProjectAppliesController(ILoggerFactory loggerFactory, IEFRepositoryFactory<PubDbContext> repositoryFactory) : base(loggerFactory, repositoryFactory)
        {
            _repository = repositoryFactory.GetRepository<ProjectApply>();
        }

        [HttpGet("projectIds")]
        public async Task<IActionResult> Get()
        {
            var userId = User.GetUserId<Guid>();
            var projectIds = await _repository.GetResultAsync(x => x.ProjectId, query => query.WithPredict(x => x.UserId == userId));
            return Ok(projectIds);
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid projectId)
        {
            var userId = User.GetUserId<Guid>();
            //
            var apply = await _repository.FetchAsync(x => x.UserId == userId && x.ProjectId == projectId);
            if (null != apply)
            {
                return Ok(apply);
            }
            return NotFound();
        }
    }
}
