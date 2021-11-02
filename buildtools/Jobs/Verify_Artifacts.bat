@echo off
setlocal EnableDelayedExpansion
if not defined SIGNTOOL_PATH exit /b 1
set FAIL=0
set LOG=%~dp0Verify_Artifacts_Log.txt

if exist "%LOG%" del /q /f "%LOG%"

for /f "tokens=1,2 usebackq delims=," %%S IN ("%~dp0Artifacts_List.txt") do (
	
	if exist "%%T" echo File: %%T FOUND
	if not exist "%%T" echo File: %%T NOT FOUND
)
echo --------------------------------------------
for /f "tokens=1,2 usebackq delims=," %%S IN ("%~dp0Artifacts_List.txt") do (
	if "%%S" == "n" (
		echo "Non signed file %%T"
		if not exist "%%T" set FAIL=1
	) else (
		"%SIGNTOOL_PATH%" verify /pa "%%T" >> "%LOG%" 2>&1 
		if not !errorlevel!==0 set FAIL=1
	)
)
type "%LOG%""
exit /b %FAIL%