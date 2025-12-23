@echo off
cd /d %~dp0
echo ========================================
echo 🔄 Ejecutando backend en modo DEV (perfil dev)
echo ========================================

REM Usamos comillas para evitar errores de PowerShell con puntos en -D...
mvn spring-boot:run "-Dspring-boot.run.profiles=dev"

pause
