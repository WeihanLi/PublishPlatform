using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WeihanLi.Common.Models;

namespace PublishPlatform.Api.Filters
{
    public class ApiResultFilter : IResultFilter, IActionFilter
    {
        public void OnResultExecuted(ResultExecutedContext context)
        {
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result != null)
            {
                if (context.Result is BadRequestResult badRequestResult)
                {
                    context.Result = new BadRequestObjectResult(context.ModelState);
                }
                else if (context.Result is ObjectResult objectResult)
                {
                    var result = ResultModel.Success(objectResult.Value);
                    objectResult.Value = result;
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid == false)
            {
            }
        }
    }
}