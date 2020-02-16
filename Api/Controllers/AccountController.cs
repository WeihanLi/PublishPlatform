using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PublishPlatform.Api.Database;
using PublishPlatform.Api.Models;
using PublishPlatform.Api.Services;
using PublishPlatform.Api.ViewModels;
using WeihanLi.EntityFramework;
using WeihanLi.Extensions;
using WeihanLi.Web.Extensions;

namespace PublishPlatform.Api.Controllers
{
    public class AccountController : ApiControllerBase
    {
        private readonly IEFRepository<PubDbContext, User> _repository;
        private readonly ITokenGenerator _tokenGenerator;

        public AccountController(
            ILoggerFactory loggerFactory,
            IEFRepositoryFactory<PubDbContext> repositoryFactory,
            ITokenGenerator tokenGenerator
            ) : base(loggerFactory, repositoryFactory)
        {
            _repository = repositoryFactory.GetRepository<User>();
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model?.OpenId) && string.IsNullOrWhiteSpace(model?.UserName))
            {
                return BadRequest(new { Error = "请求参数异常" });
            }
            //
            Models.User user;
            if (model.OpenId.IsNotNullOrEmpty())
            {
                //
                user = await _repository.FetchAsync(x => x.OpenId == model.OpenId);
            }
            else
            {
                user = await _repository.FetchAsync(x => x.UserName == model.UserName);
            }
            if (null == user)
            {
                return BadRequest(new { Error = "用户不存在" });
            }

            if (user.IsVerified)
            {
                var claims = new List<Claim>
                {
                    new Claim("nameid", user.Id.ToString("N")),
                };

                var token = _tokenGenerator.GenerateToken(claims);

                return Ok(token);
            }

            var verificationRepo = RepositoryFactory.GetRepository<Verification>();
            var verification = await verificationRepo.FetchAsync(v => v.UserId == user.Id, HttpContext.RequestAborted);
            if (null == verification)
            {
                verification = new Verification()
                {
                    UserId = user.Id,
                };
                await verificationRepo.InsertAsync(verification, HttpContext.RequestAborted);
            }

            return BadRequest(new { Error = "用户未认证", Result = verification });
        }

        [HttpGet("profile")]
        [AllowAnonymous]
        public async Task<IActionResult> Profile(Guid? userId)
        {
            userId = userId.GetValueOrDefault(User.GetUserId<Guid>());
            if(userId == Guid.Empty)
            {
                return BadRequest();
            }
            var user = await _repository.FetchAsync(x => x.Id == userId, HttpContext.RequestAborted);
            if (user != null)
            {
                return Ok(new
                {
                    user.DisplayName,
                    user.ProfileImageUrl,
                    user.PhoneNumber,
                });
            }
            return NotFound();
        }

        [HttpPut("profile")]
        public async Task<IActionResult> Profile([FromBody]UserProfileViewModel model)
        {
            var userId = User.GetUserId<Guid>();
            var user = new User
            {
                Id = userId,
                ProfileImageUrl = model.ProfileImageUrl,
                DisplayName = model.ProfileImageUrl,
            };

            var result = await _repository.UpdateAsync(user, u => u.ProfileImageUrl, u => u.DisplayName);
            return Ok(new
            {
                Result = result
            });
        }

        [HttpGet("verification")]
        public async Task<IActionResult> GetVerificationInfo()
        {
            var userId = User.GetUserId<Guid>();
            var verificationsRepo = RepositoryFactory.GetRepository<Verification>();
            var verification = await verificationsRepo.FetchAsync(x => x.UserId == userId, HttpContext.RequestAborted);
            if (verification != null)
            {
                return Ok(verification);
            }
            return NotFound();
        }

        [HttpPut("verification")]
        [AllowAnonymous]
        public async Task<IActionResult> Verification([FromBody]Verification model)
        {
            var userId = User.GetUserId<Guid>();
            if (userId == Guid.Empty)
            {
                if (model.UserId != Guid.Empty)
                {
                    userId = model.UserId;
                }
                else
                {
                    return BadRequest(new { Error = "用户信息异常" });
                }
            }

            var verificationsRepo = RepositoryFactory.GetRepository<Verification>();
            var verification = await verificationsRepo.FetchAsync(x => x.UserId == userId, HttpContext.RequestAborted);
            if (verification != null)
            {
                model.Id = verification.Id;

                await verificationsRepo.UpdateWithoutAsync(model,
                   v => v.UserId,
                   v => v.CreatedAt,
                   v => v.Status,
                   v => v.Remark
                   );
            }
            else
            {
                model.UserId = userId;
                model.Status = ReviewStatus.UnReviewed;
                model.Remark = null;

                await verificationsRepo.InsertAsync(model, HttpContext.RequestAborted);
            }
            return Ok(model);
        }
    }
}
