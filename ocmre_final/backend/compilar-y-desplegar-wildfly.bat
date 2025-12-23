@echo off
setlocal

REM ======== CONFIGURACIÓN ========
REM Ruta a JDK 17 (ajusta si la tuya es diferente)
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

REM Ruta de instalación de WildFly (ajústala si es distinta)
set WILDFLY_HOME=D:\servidor\wildfly-26.1.2.Final

REM Nombre del archivo WAR generado
set WAR_NAME=ficha.war

echo ========================================
echo Compilando proyecto con Java 17 (sin tests)...
echo JAVA_HOME: %JAVA_HOME%
java -version
echo ========================================

REM Compilar sin ejecutar pruebas
mvn clean install -DskipTests

REM Verificar si el WAR fue generado
IF EXIST target\%WAR_NAME% (
    echo ✅ WAR compilado: target\%WAR_NAME%
) ELSE (
    echo ❌ ERROR: No se encontró el archivo target\%WAR_NAME%
    pause
    exit /b
)

REM Copiar WAR a WildFly
echo ========================================
echo Desplegando WAR en WildFly...
copy /Y target\%WAR_NAME% "%WILDFLY_HOME%\standalone\deployments\"
echo ✅ Despliegue copiado a: %WILDFLY_HOME%\standalone\deployments\%WAR_NAME%

echo.
echo 👉 Ahora inicia WildFly manualmente si aún no está corriendo:
echo     %WILDFLY_HOME%\bin\standalone.bat
echo.
pause
endlocal

