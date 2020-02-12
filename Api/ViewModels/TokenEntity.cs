namespace PublishPlatform.Api.ViewModels
{
    /// <summary>
    /// Token Entity
    /// </summary>
    public class TokenEntity
    {
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// ExpiresIn
        /// </summary>
        public int ExpiresIn { get; set; }
    }
}