using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PublishPlatform.Api.Database;
using PublishPlatform.Api.Models;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WeihanLi.EntityFramework;
using WeihanLi.Extensions;

namespace PublishPlatform.Api.Controllers
{
    public class ProjectsController : ApiControllerBase
    {
        private readonly IEFRepository<PubDbContext, Project> _repository;

        public ProjectsController(ILoggerFactory loggerFactory, IEFRepositoryFactory<PubDbContext> repositoryFactory) : base(loggerFactory, repositoryFactory)
        {
            _repository = repositoryFactory.GetRepository<Project>();
        }

        [HttpGet]
        public async Task<IActionResult> Get(string keyword, int pageNum, int pageSize)
        {
            Expression<Func<Project, bool>> predict = n => n.Status != ProjectStatus.NotPublished;
            if (keyword.IsNotNullOrWhiteSpace())
            {
                keyword = keyword.Trim();
                predict = predict.And(n => n.Name.Contains(keyword));
            }
            var result = await _repository.GetPagedListResultAsync(project => new
            {
                project.Id,
                project.Status,
                project.Begin,
                project.End,
                project.Name,
                project.PublishedAt,
            }, query => query.WithPredict(predict), pageNum, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _repository.FetchAsync(p => p.Id == id);
            if (null == result)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}