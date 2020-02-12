namespace PublishPlatform.Api.Models
{
    public enum ReviewStatus
    {
        /// <summary>
        /// 待审核
        /// </summary>
        UnReviewed = 0,

        /// <summary>
        /// 审核通过
        /// </summary>
        Reviewed = 1,

        /// <summary>
        /// 审核未通过
        /// </summary>
        Rejected = 2,
    }
}