@ECHO OFF
:: Prerequisite Summary:
:: 1 - System must use JRE8 on the Runner/Build Server
:: 2 - You must have the black duck protex client installed and added to the system %PATH% on the Runner/BuildServer
:: 3 - You must have a faceless SWLC Account (info below)
:: 4 - You must create the project in protex (recommend to not use spaces in names) - and add the faceless account to users
:: 5 - You must create the application in Code Center (recommend to not use spaces in names) and set the version to unspecified
:: 6 - You must ensure the face-less account has Protex credentials stored in code center   
::		(Note:  If you get invalid credentials when running the two Associate and Validate tasks below - this is likely the cause
:: 7 - You must set the variables below
:: 8 (optional) -  include .bdsignore and .bdsignore.all files -  https://wiki.ith.intel.com/display/SWLC/How+to+add+a+.bdsignore.all+File+to+Your+Source+Code
::
:: PREREQ 1:  (Use JRE8)
::	On the runner/build server - This Script requires JRE8, JRE9 will break many of the scripts
::	I was able to solve GetScanResults by adding  --add-modules java.xml.ws    Example:  java --add-modules java.xml.ws -jar .......
::	However the rest fail with some "Can't cast x as y" issues that I can't seem to work around easily
::
::
:: PREREQ 2:  (Install Blackduck and add to %PATH%)
::	On the runner/build system, Log into Protex, click tools, and download the 32-bit client from there
::	Open Control Panel->System->Edit the system environment variables
::	This will open System Properties, click the Environment Variables button
::	Click on Path in the 2nd box (Environment, not User  --- User can work but you would have to make sure you add it to the environment path for the specific user that will run this)
::
::
:: PREREQ 3:
::	You will want to use a SWLC faceless account:   https://wiki.ith.intel.com/display/SWLC/Create+Faceless+Account+for+SWLC
::
:: PREREQ 4:  (Setup Protex Project)
::	Log in to Protex
::	Select "Create Project" button
::	Enter a project name.  Recommend to not use spaces.  If you do use spaces, specify "name of project" with the double quotes
::	Ensure that you've added the face-less account to the project
::	1. Click on the project
::	2. Click on the "Users" tab
::	3. Select the faceless account from the left and click Add User to move it to the right
::	
:: PREREQ 5:  Create CodeCenter Application
::	1. Log in to Code Center
::	2. Select Governance then Applications
::	3. Select Create Application
::	4. Enter Name.  Recommend to not use spaces.  If you do use spaces, specify "name of project" with the double quotes
::	5. Enter unspecified for version  <--You will get errors if you don't do this
::	follow the rest of your process as normal
::
:: PREREQ 6:  Make sure CodeCenter has Protex Credentials   <--Important to not get invalid credentials errors when running the code center steps
::	1. Log in to Code Center AS THE FACELESS USER
::	2. click on the username (top right)
::	3. select the "Protext Credentials" tab
::	4. Ensure that the credentials are listed for the Protex server, or add them if they aren't
::
:: PREREQ 7:  Variables
:: For automation, you can have the GitLab runner setup the above environment variables by using Group and Project variables.
:: In the project or group, go to  Settings->CI/CD and Expand "Secret Variables"
:: SET PROTEX_SERVER=https://jfipscn06.intel.com 
:: SET PROTEX_USER=<normally in the idsid format without the domain>  -- use a faceless account
:: SET PROTEX_PASS=<password for the user>
:: SET PROTEX_PROJECT=c_v4_scratchpad_plugin_14984
::	This is just an example, to find your project ID look at this WIKI:  
::	https://wiki.ith.intel.com/display/SWLC/How+to+Find+the+ProjectID+for+a+Project+on+Protex
:: SET PROTEX_PROJECT_NAME=v4_Scratchpad_Plugin
::	THESE ARE CASE SENSITIVE!!  This is just an example, copy/paste the name from Protex
::	And if you ever change the name, remember to update this value!
:: SET CODECENTER_SERVER=https://sccodecenter.intel.com   Or update to yours
:: SET CODECENTER_USER=<normally email address format>  --  use a faceless account
:: SET CODECENTER_PASS=<password for user>
:: SET CODECENTER_PROTEX_SERVER_NAME="JF06 (New Master License Server)"
::	This value is the name of the protex server as it appears in Code Center.
::	To get this value: 
::	 1. log in to Code Center
::	 2. click on your username (top right)
::	 3. select the "Protext Credentials" tab
::	 4. Use the value in the Server Name column - or "Create Protex Credentials" and choose the server name from the dropdown
:: SET CODECENTER_APPLICATION=v4_Scratchpad_Plugin
::	THESE ARE CASE SENSITIVE!!  This is just an example, copy the name from the application and ALWAYS set the Version in the application to unspecified
::	And if you ever change the name, remember to update this value!

SET P=%~dp0

:: Create Directory
@echo Create Results folder...
mkdir .\ProtexResults > nul 2>&1
set ERR=

if not defined PROTEX_SERVER call :missing_var PROTEX_SERVER
if not defined PROTEX_USER call :missing_var PROTEX_USER
if not defined PROTEX_PASS call :missing_var PROTEX_PASS
if not defined PROTEX_PROJECT call :missing_var PROTEX_PROJECT
if not defined PROTEX_PROJECT_NAME call :missing_var PROTEX_PROJECT_NAME
if not defined CODECENTER_SERVER call :missing_var CODECENTER_SERVER
if not defined CODECENTER_USER call :missing_var CODECENTER_USER
if not defined CODECENTER_PASS call :missing_var CODECENTER_PASS
if not defined CODECENTER_APPLICATION call :missing_var CODECENTER_APPLICATION
if not defined CODECENTER_SERVER_NAME call :missing_var CODECENTER_SERVER_NAME
if defined ERR exit /b 1

:: Scan Protex
@echo(
@echo(
@echo Scan Protext Project...    
C:\Windows\system32\cmd.exe /c %P%ScanProtexProject\ScanProtexProject.bat %PROTEX_SERVER% %PROTEX_USER% %PROTEX_PASS% %PROTEX_PROJECT% . "C:\Program Files (x86)\Black Duck Software\protexIP\bin"
if %errorlevel% NEQ 0 exit /b %errorlevel%
  
@echo(
@echo(
@echo Get Scan Results...    
C:\Windows\system32\cmd.exe /c java -jar %P%GetScanResult\GetScanResult.jar %PROTEX_SERVER% %PROTEX_USER% %PROTEX_PASS% %PROTEX_PROJECT% .\ProtexResults\ProtexScan.xml  
if %errorlevel% NEQ 0 exit /b %errorlevel%

@echo(
@echo(
@echo Generate COS Report...
C:\Windows\system32\cmd.exe /c java -jar %P%GenerateCOSReport\GetCOSReport.jar %PROTEX_SERVER% %PROTEX_USER% %PROTEX_PASS% %PROTEX_PROJECT% .\ProtexResults\COSReport
if %errorlevel% NEQ 0 exit /b %errorlevel%

@echo(
@echo(
@echo Generate IP Plan Report...
C:\Windows\system32\cmd.exe /c java -jar %P%GenerateIPPlanReport\GenerateIPPlanReport.jar %CODECENTER_SERVER% %CODECENTER_USER% %CODECENTER_PASS% %CODECENTER_APPLICATION% .\ProtexResults\
if %errorlevel% NEQ 0 exit /b %errorlevel%

@echo(
@echo(
@echo Associate And Validate Protext Project...
C:\Windows\system32\cmd.exe /c java -jar %P%RunAssociateAndValidateProtexProject\RunAssociateAndValidateProtexProject.jar %CODECENTER_SERVER% %CODECENTER_USER% %CODECENTER_PASS% %CODECENTER_APPLICATION% %PROTEX_PROJECT_NAME% %CODECENTER_SERVER_NAME%
if %errorlevel% NEQ 0 exit /b %errorlevel%

@echo(
@echo(
@echo Get Associate And Validate Result...
C:\Windows\system32\cmd.exe /c java -jar %P%GetAssociateAndValidateResult\GetValidateAndAssociateResult.jar %CODECENTER_SERVER% %CODECENTER_USER% %CODECENTER_PASS% %CODECENTER_APPLICATION% .\ProtexResults\
if %errorlevel% NEQ 0 exit /b %errorlevel%

@echo(
@echo(
@echo Generate Protex Scan Dashboard...
C:\Windows\system32\cmd.exe /c java -jar %P%GenerateProtexScanDashboard\GenerateProtexScanDashboard.jar .\ProtexResults\ .\ProtexResults\Protex_Project_Dashboard.html
if %errorlevel% NEQ 0 exit /b %errorlevel%

@echo(
@echo(
@echo Generate Code Center Dashboard...
C:\Windows\system32\cmd.exe /c java -jar %P%GenerateCodeCenterDashboard\GenerateCodeCenterDashboard.jar .\ProtexResults\ .\ProtexResults\CodeCenter_Dashboard.html
if %errorlevel% NEQ 0 exit /b %errorlevel%

goto :eof

:missing_var
 echo Variable %1 is not defined.
 set ERR=1
 exit /b 1