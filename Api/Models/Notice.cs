namespace PublishPlatform.Api.Models
{
    public class Notice : EntityBase
    {
        public string Title { get; set; }

        public string Path { get; set; }

        public string Detail { get; set; }

        public int ViewCount { get; set; }

        public ReviewStatus Status { get; set; }
    }
}