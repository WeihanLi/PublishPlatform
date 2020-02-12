using System;

namespace PublishPlatform.Api.Models
{
    public class AuditLog : EntityBase<int>
    {
        public string AuditType { get; set; }

        public Guid ObjectId { get; set; }

        public string Remark { get; set; }

        public ReviewStatus Status { get; set; }

        public Guid AuditedBy { get; set; }
    }
}