@echo off
SETLOCAL EnableDelayedExpansion
set varSection=false
for /f "delims=" %%i in (.gitlab-ci.yml) do (
    set safe=%%i
    call :findVarsSection "!safe:&=and!"
)
goto :eof

:nothing
goto :eof

:findVarsSection
set first=%~1
if not defined first goto :eof
if not "%first:~0,2%"=="  " set varSection=false
set noQuotes=%first:"=%
if "%noQuotes:~0,10%"=="variables:" set varSection=true
if %varSection%==true call :findValues %first%
goto :eof

:findValues
set myFirst=%*
if not defined myFirst goto :eof
if "%myFirst:~0,1%"=="#" goto :eof
if "%myFirst:~0,10%"=="variables:" goto :eof
for /f "delims=# tokens=1" %%a in ("%myFirst%") do call :formBat "%%a"
goto :eof

:formBat
set bFirst=%~1
if not defined bFirst goto :eof
set bFirst=%bFirst:: '==%
set bFirst=%bFirst:'=%
echo set %bFirst%
goto :eof