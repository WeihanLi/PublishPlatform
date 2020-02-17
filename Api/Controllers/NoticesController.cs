using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PublishPlatform.Api.Database;
using PublishPlatform.Api.Models;
using WeihanLi.EntityFramework;
using WeihanLi.Extensions;

namespace PublishPlatform.Api.Controllers
{
    public class NoticesController : ApiControllerBase
    {
        private readonly IEFRepository<PubDbContext, Notice> _repository;

        public NoticesController(ILoggerFactory loggerFactory, IEFRepositoryFactory<PubDbContext> repositoryFactory) : base(loggerFactory, repositoryFactory)
        {
            _repository = repositoryFactory.GetRepository<Notice>();
        }

        [HttpGet]
        public async Task<IActionResult> Get(int pageNum, int pageSize, string keyword)
        {
            Expression<Func<Notice, bool>> predict = n => n.Status == ReviewStatus.Reviewed;
            if (keyword.IsNotNullOrWhiteSpace())
            {
                keyword = keyword.Trim();
                predict = n => n.Status == ReviewStatus.Reviewed
                               && n.Title.Contains(keyword);
                // predict = predict.And(n => n.Title.Contains(keyword));
            }

            var result = await _repository.GetPagedListResultAsync(notice => new
            {
                notice.Path,
                notice.Title,
                notice.ViewCount,
                notice.CreatedAt,
            }, query => query.WithPredict(predict), pageNum, pageSize,
                HttpContext.RequestAborted);
            return Ok(result);
        }

        [HttpGet("{path}")]
        public async Task<IActionResult> Get(string path)
        {
            var result = await _repository.FetchAsync(p => p.Path == path, HttpContext.RequestAborted);
            if (null == result)
            {
                return NotFound();
            }
            result.ViewCount += 1;
            await _repository.UpdateAsync(result, n => n.ViewCount);
            return Ok(result);
        }
    }
}
