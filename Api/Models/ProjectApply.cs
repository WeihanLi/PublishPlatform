using System;
using System.ComponentModel.DataAnnotations;

namespace PublishPlatform.Api.Models
{
    public class ProjectApply : EntityBase
    {
        public Guid UserId { get; set; }

        public Guid ProjectId { get; set; }

        public string Description { get; set; }

        public int WorkDays { get; set; }

        public ReviewStatus Status { get; set; }

        [StringLength(256)]
        public string Remark { get; set; }
    }
}
