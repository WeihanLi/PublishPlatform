using Microsoft.IdentityModel.Tokens;
using System;

namespace PublishPlatform.Api.ViewModels
{
    /// <summary>
    /// TokenOptions
    /// </summary>
    public class TokenOptions
    {
        /// <summary>
        /// "iss" (Issuer) Claim
        /// </summary>
        /// <remarks>The "iss" (issuer) claim identifies the principal that issued the
        ///   JWT.  The processing of this claim is generally application specific.
        ///   The "iss" value is a case-sensitive string containing a StringOrURI
        ///   value.  Use of this claim is OPTIONAL.</remarks>
        public string Issuer { get; set; }

        /// <summary>
        /// "aud" (Audience) Claim
        /// </summary>
        /// <remarks>The "aud" (audience) claim identifies the recipients that the JWT is
        ///   intended for.  Each principal intended to process the JWT MUST
        ///   identify itself with a value in the audience claim.  If the principal
        ///   processing the claim does not identify itself with a value in the
        ///   "aud" claim when this claim is present, then the JWT MUST be
        ///   rejected.  In the general case, the "aud" value is an array of case-
        ///   sensitive strings, each containing a StringOrURI value.  In the
        ///   special case when the JWT has one audience, the "aud" value MAY be a
        ///   single case-sensitive string containing a StringOrURI value.  The
        ///   interpretation of audience values is generally application specific.
        ///   Use of this claim is OPTIONAL.</remarks>
        public string Audience { get; set; }

        /// <summary>
        /// Set the timespan the token will be valid for (default is 2 hour/7200 seconds)
        /// </summary>
        public TimeSpan ValidFor { get; set; } = TimeSpan.FromHours(2);

        /// <summary>
        /// The signing key to use when generating tokens.
        /// </summary>
        public SigningCredentials SigningCredentials { get; set; }
    }
}