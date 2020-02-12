using System;

namespace PublishPlatform.Api.Models
{
    public class EntityBase<TKey>
    {
        public TKey Id { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }

    public class EntityBase : EntityBase<Guid> { }
}