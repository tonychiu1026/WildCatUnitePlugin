::@echo off
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
REM if not defined EXE_RELEASE_FOLDER exit /b 2
REM if not defined MSI_RELEASE_FOLDER exit /b 3
if not defined DEPLOY_FOLDER exit /b 4
if not defined CI_PIPELINE_IID exit /b 6
if not defined MAJOR_BUILD exit /b 7
if not defined MINOR_BUILD exit /b 8
if not defined REVIEW_FOLDER exit /b 9
if not defined CI_REPOSITORY_URL exit /b 10
if not defined PROPER_NAME exit /b 11

set version=%MAJOR_BUILD%.%MINOR_BUILD%.%CI_PIPELINE_IID%

set REVIEW_DEPLOY_FOLDER="%DEPLOY_FOLDER%\%PROPER_NAME%\%REVIEW_FOLDER%\%version%"

rem :: POST v4
echo Copying Files to Server

mkdir "%REVIEW_DEPLOY_FOLDER%\"
mkdir "%REVIEW_DEPLOY_FOLDER%\src\"
mkdir "%REVIEW_DEPLOY_FOLDER%\reports\CodeCoverage\"
mkdir "%REVIEW_DEPLOY_FOLDER%\reports\ProtexResults\"

copy /y CodeCoverage\*.* "%REVIEW_DEPLOY_FOLDER%\reports\CodeCoverage\"
copy /y build_tools\Verify_Artifacts_Log.txt "%REVIEW_DEPLOY_FOLDER%\reports\"
copy /y build_tools\Verify_Virus_Artifacts_Log.txt "%REVIEW_DEPLOY_FOLDER%\reports\"
xcopy /cherky ".\ProtexResults\*.*" "%REVIEW_DEPLOY_FOLDER%\reports\ProtexResults"
(
	echo Certificates
	echo Templates
) > except.txt
xcopy /cherky "%MODULE_RELEASE_FOLDER%\*.dll" "%REVIEW_DEPLOY_FOLDER%\hub\TemplatePluginBin\" /exclude:except.txt

copy /y "%CAB_RELEASE_FOLDER%\*.bson" "%REVIEW_DEPLOY_FOLDER%\hub\"
copy /y "%CAB_RELEASE_FOLDER%\*.cab" "%REVIEW_DEPLOY_FOLDER%\hub\"
copy /y "%CAB_RELEASE_FOLDER%\*.wxi" "%REVIEW_DEPLOY_FOLDER%\hub\"
REM copy /y "%~dp0..\%CAB_RELEASE_FOLDER%\*.msi" "%REVIEW_DEPLOY_FOLDER%\hub\"

:: CI_REPOSITORY_URL includes the runner's token.
:: One day find a variable that will auto-fill this in
echo https://gitlab.devtools.intel.com/BCPD/Unite/Plugins/bce/ToolsAndDocumentation/template>"%REVIEW_DEPLOY_FOLDER%\src\src.txt"
echo %CI_PIPELINE_URL%>>"%REVIEW_DEPLOY_FOLDER%\src\src.txt"
