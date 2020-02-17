using System.ComponentModel.DataAnnotations;

namespace PublishPlatform.Api.Models
{
    public class Notice : EntityBase
    {
        [StringLength(64)]
        [Required]
        public string Title { get; set; }

        [StringLength(512)]
        [Required]
        public string Path { get; set; }

        public string Detail { get; set; }

        public int ViewCount { get; set; }

        public ReviewStatus Status { get; set; }
    }
}
