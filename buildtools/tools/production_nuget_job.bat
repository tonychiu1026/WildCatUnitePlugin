@echo off
:: Without the API_KEY this can't be deployed. Return 1 to cause the build to fail
if not defined API_KEY exit /b 1
if not defined PROJECT_PATH exit /b 2

set version=%MAJOR_BUILD%.%MINOR_BUILD%.%CI_PIPELINE_IID%

echo %API_KEY%

:: assumes a successfull build
c:\nuget\nuget.exe pack "%~dp0..\%PROJECT_PATH%" -Properties "Configuration=Release;Owners=Brad Patterson,Vaul;Description=Intel Unite plugin helper for messaging."
::c:\nuget\nuget.exe pack "%~dp0..\%NUSPEC_PATH%" -Version %version% -Properties Configuration=Release
c:\nuget\nuget.exe push *.nupkg %API_KEY% -Source https://hfsyukon001.amr.corp.intel.com/NugetServer/nuget