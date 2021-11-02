@echo off	
set PACMD="%~dp0..\tools\paexec.exe"
set LOGFILE=%~dp0%~n0.log

if not defined CERT_USER exit /b 1
if not defined CERT_PASS exit /b 2

:: Am I already CERT_USER?
if /i %CERT_USER%==%USERDOMAIN%\%USERNAME% goto run

set PACMD=%PACMD% -u %CERT_USER% -p %CERT_PASS%

%PACMD% cmd /c "%0 %* > %LOGFILE% 2>&1"
set LASTERROR=%ERRORLEVEL%
type %LOGFILE%
echo Return Code: %LASTERROR%
exit /b %LASTERROR%

:run

REM if not defined EXE_RELEASE_FOLDER exit /b 3
REM if not defined MSI_RELEASE_FOLDER exit /b 4
if not defined DEPLOY_FOLDER exit /b 5
if not defined CI_PIPELINE_IID exit /b 6
if not defined MAJOR_BUILD exit /b 7
if not defined MINOR_BUILD exit /b 8
if not defined REVIEW_FOLDER exit /b 9
if not defined STAGING_FOLDER exit /b 10

set version=%MAJOR_BUILD%.%MINOR_BUILD%.%CI_PIPELINE_IID%

set REVIEW_DEPLOY_FOLDER="%DEPLOY_FOLDER%\%REVIEW_FOLDER%\%version%"
set STAGE_DEPLOY_FOLDER="%DEPLOY_FOLDER%\%STAGING_FOLDER%\%version%"

:: POST v4 to staging
if not exist "%REVIEW_DEPLOY_FOLDER%\" exit /b 11

mkdir "%STAGE_DEPLOY_FOLDER%\"

xcopy /cherky "%REVIEW_DEPLOY_FOLDER%\*.*" "%STAGE_DEPLOY_FOLDER%\"