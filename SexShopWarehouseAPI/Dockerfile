# SexShopWarehouseAPI/Dockerfile

# 1. СТАДИЯ СБОРКИ
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# ВАЖНОЕ ИЗМЕНЕНИЕ: Копируем файл проекта из вложенной папки в контейнере
COPY ["./SexShopWarehouseAPI/SexShopWarehouseAPI.csproj", "SexShopWarehouseAPI/"] 

# Восстанавливаем зависимости
RUN dotnet restore "./SexShopWarehouseAPI/SexShopWarehouseAPI.csproj"

# Копируем весь остальной исходный код (теперь это будет SexShopWarehouseAPI/...)
COPY . .

# Публикуем приложение
RUN dotnet publish "./SexShopWarehouseAPI/SexShopWarehouseAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# --------------------------------------------------------------------------------

# 2. СТАДИЯ ЗАПУСКА 
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080 
ENTRYPOINT ["dotnet", "SexShopWarehouseAPI.dll"]