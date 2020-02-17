using System;
using System.ComponentModel.DataAnnotations;

namespace PublishPlatform.Api.Models
{
    public class Project : EntityBase
    {
        [StringLength(32)]
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset PublishedAt { get; set; }

        public DateTimeOffset Begin { get; set; }

        public DateTimeOffset End { get; set; }

        public ProjectStatus Status { get; set; }

        public string Extra { get; set; }
    }

    public enum ProjectStatus
    {
        NotPublished = 0,

        Published = 1,

        Completed = 2,

        Dropped = 3
    }
}
