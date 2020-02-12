using Microsoft.Extensions.Options;
using PublishPlatform.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PublishPlatform.Api.Services
{
    public interface ITokenGenerator
    {
        TokenEntity GenerateToken(ICollection<Claim> claims);
    }

    public class TokenGenerator : ITokenGenerator
    {
        private readonly TokenOptions _tokenOptions;
        private readonly JwtSecurityTokenHandler _tokenHandler;

        public TokenGenerator(IOptions<TokenOptions> tokenOptions)
        {
            _tokenOptions = tokenOptions.Value;
            _tokenHandler = new JwtSecurityTokenHandler();
        }

        public TokenEntity GenerateToken(ICollection<Claim> claims)
        {
            var now = DateTimeOffset.UtcNow;
            var claimList = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            };
            if (claims != null)
            {
                claimList.AddRange(claims);
            }

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: _tokenOptions.Issuer,
                audience: _tokenOptions.Audience,
                claims: claims,
                notBefore: now.UtcDateTime,
                expires: now.Add(_tokenOptions.ValidFor).UtcDateTime,
                signingCredentials: _tokenOptions.SigningCredentials);

            var encodedJwt = _tokenHandler.WriteToken(jwt);

            var response = new TokenEntity
            {
                Token = encodedJwt,
                ExpiresIn = (int)_tokenOptions.ValidFor.TotalSeconds
            };

            return response;
        }
    }
}