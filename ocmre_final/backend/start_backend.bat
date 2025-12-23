@echo off
REM === Cambia esta ruta según donde esté instalado Oracle ===
SET ORACLE_BIN=C:\oracle\product\11.1.0\client_1\BIN

REM === Agrega Oracle al PATH temporalmente para esta sesión ===
SET PATH=%ORACLE_BIN%;%PATH%

echo.
echo 🟡 Iniciando Oracle Listener...
lsnrctl start

echo.
echo 🟢 Esperando 5 segundos para asegurar inicio del listener...
timeout /t 5 /nobreak > NUL

REM === Cambia a la carpeta donde está tu proyecto Spring Boot ===
cd /d C:\Users\asalas\Desktop\ficha

echo.
echo 🚀 Iniciando Backend con perfil dev...
mvn spring-boot:run -Dspring-boot.run.profiles=dev
