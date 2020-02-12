using System;

namespace PublishPlatform.Api.Models
{
    public class Verification : EntityBase
    {
        public string RealName { get; set; }

        public string PhoneNumber { get; set; }

        public string CompanyName { get; set; }

        public Guid UserId { get; set; }

        public string Extra { get; set; }

        public ReviewStatus Status { get; set; }

        public string Remark { get; set; }
    }
}