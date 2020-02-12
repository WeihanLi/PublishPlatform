namespace PublishPlatform.Api.Models
{
    public class User : EntityBase
    {
        public string UserName { get; set; }

        public string DisplayName { get; set; }

        public string ProfileImageUrl { get; set; }

        public string PhoneNumber { get; set; }

        // 微信 openId
        public string OpenId { get; set; }

        public bool IsVerified { get; set; }
    }
}