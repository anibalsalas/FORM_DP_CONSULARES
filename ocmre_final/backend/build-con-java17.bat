@echo off
setlocal

REM Ruta a tu JDK 17 (ajústalo si es necesario)
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo ========================================
echo Compilando proyecto con Java 17...
echo JAVA_HOME: %JAVA_HOME%
java -version
echo ========================================

REM Ejecutar Maven
mvn clean install

pause
endlocal
