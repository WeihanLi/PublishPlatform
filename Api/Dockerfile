FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

# copy everything and build
COPY . .

RUN dotnet publish -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine
LABEL Maintainer="WeihanLi"
WORKDIR /app
COPY --from=build-env /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "PublishPlatform.Api.dll"]
