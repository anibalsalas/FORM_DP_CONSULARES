@echo off
setlocal

REM Ruta a tu JDK 17
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo ========================================
echo Abriendo VSCode con Java 17 activo...
echo JAVA_HOME: %JAVA_HOME%
java -version
echo ========================================

REM Abrir VSCode en esta carpeta
code .

endlocal
