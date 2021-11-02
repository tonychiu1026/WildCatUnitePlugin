@echo on

if not defined OPENCOVER_PATH exit /b 1
if not defined REPORTGENERATOR_PATH exit /b 2
if not defined XUNIT_PATH exit /b 3
if not defined XTOJUNIT_PATH exit /b 4

if not defined MODULE_RELEASE_FOLDER exit /b 5
if not defined MODULE_TEST_FOLDER exit /b 6

if not defined NUGET_PATH exit /b 7
if not defined MSBUILD_PATH exit /b 8
if not defined SOLUTION exit /b 9
if not defined CI_COMMIT_REF_NAME exit /b 10
if not defined SONAR_KEY exit /b 999
if not defined SONAR_TOKEN exit /b 998
if not defined SONAR_SERVER exit /b 997

:: ** Restore Dependancies **
"%NUGET_PATH%" restore
:: exit is this fails
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%

:: ** Start Sonarqube **
set SONAR_SCANNER_OPTS=-Djavax.net.ssl.trustStore="%JAVA_HOME%\lib\security\cacerts" -Djavax.net.ssl.keyStore="%JAVA_HOME%\lib\security\cacerts"
SonarScanner.MSBuild.exe begin /k:"%SONAR_KEY%" /d:sonar.host.url="%SONAR_SERVER%" /d:sonar.login="%SONAR_TOKEN%" /d:sonar.cs.xunit.reportsPaths="CodeCoverage\TestResults.xml" /d:sonar.cs.opencover.reportsPaths="CodeCoverage\results.xml"
:: exit is this fails
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%

:: ** Build **
"%MSBUILD_PATH%" "%SOLUTION%" /p:Configuration=Release /t:Rebuild
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%

:: ** Test **
:: Skip tests if Build Failed

if not exist "CodeCoverage" mkdir "CodeCoverage"
:: Test
"%OPENCOVER_PATH%" -register:Path64 -returntargetcode -target:"%XUNIT_PATH%" -targetargs:"%MODULE_TEST_FOLDER%\%MODULE_TEST_DLL% -xml CodeCoverage\TestResults.xml -html CodeCoverage\TestResults.html" -searchdirs:"%MODULE_RELEASE_FOLDER%;%MODULE_TEST_FOLDER%" -output:CodeCoverage\results.xml "-filter:+[UnitePlugin*]* -[Appccelerate*]* -[Ninject*]* -[*.Test*]* -[Moq*]* -[*Installer*]*"
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%
:: Generate code coverage report
"%REPORTGENERATOR_PATH%" "-reports:CodeCoverage\results.xml" "-targetdir:CodeCoverage"
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%
:: Convert results for gitlab consumption
"%XTOJUNIT_PATH%" "CodeCoverage\TestResults.xml" "CodeCoverage\TestResultsJUnit.xml"
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%
:: Output code coverage for gitlab badge
type "CodeCoverage\index.htm" | find /i "branch coverage:"
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%

:: ** End Sonarqube **
:stopSonar
SonarScanner.MSBuild.exe end /d:sonar.login="%SONAR_TOKEN%"
if not %ERRORLEVEL%==0 exit /b %ERRORLEVEL%