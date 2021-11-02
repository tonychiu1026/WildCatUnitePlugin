@echo off
setlocal EnableDelayedExpansion
if not defined VSCANNER_PATH exit /b 1
set FAIL=0
set LOG=%~dp0Verify_Virus_Artifacts_Log.txt

if exist "%LOG%" del /q /f "%LOG%"

for /f "usebackq delims=" %%A IN ("%~dp0Artifacts_List.txt") do (
    "%VSCANNER_PATH%" "%~dp0..\%%A" >> "%LOG%" 2>&1 
    if not !errorlevel!==0 set FAIL=1
)
type "%LOG%""
exit /b %FAIL%