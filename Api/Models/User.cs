using System.ComponentModel.DataAnnotations;

namespace PublishPlatform.Api.Models
{
    public class User : EntityBase
    {
        [StringLength(64)]
        [Required]
        public string UserName { get; set; }

        [StringLength(64)]
        [Required]
        public string DisplayName { get; set; }

        [StringLength(1024)]
        public string ProfileImageUrl { get; set; }

        [StringLength(16)]
        public string PhoneNumber { get; set; }

        // 微信 openId
        public string OpenId { get; set; }

        public bool IsVerified { get; set; }
    }
}
