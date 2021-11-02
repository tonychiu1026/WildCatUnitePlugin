<#
.SYNOPSIS
  Name: CreateAndSignCab.ps1
  To create and Sign Cab files from a dll.
  
.DESCRIPTION
  The script is used post build for unite plugins to be in the correct format for the admin portal to accept the package.
  Note that if no pfx file is provided a self singed certificate will be created.

.PARAMETER SolutionDir
  The directory of the solution. The scrit creates a Builds Directory here. Note that VS Studio $SolutionDir has a trailing \. 
  If \" is passed then it is viewd as an escaped double quote. so something like "$(SolutionDir)" will not work right

.PARAMETER SolutionName
  The name of the Cab file

.PARAMETER TargetPath
  The Path the The dll

.PARAMETER ManifestGeneratorDir
  The directory which contains Intel Unite Manifest Tool.exe

.PARAMETER Password
  The pasword for the pfx file used in the certifcate

.PARAMETER PFXPath
  The path tp a pfx file. Iclued the extentuion .pfx
  
.PARAMETER CertDnsName
  the cert dnsname
  
.PARAMETER CertStore
  tHE certificate store default is 'CurrentUser\My'

.NOTES
    Release Date: 2019-05-23
   
  Author: Vaul Demar Kranak

.EXAMPLE
  When added to th Post-build events command line:
  powershell.exe -ExecutionPolicy Bypass -NoProfile -NonInteractive -File "$(SolutionDir)..\build_Tools\CreateAndSignCab.ps1" -SolutionDir "$(ProjectDir).." -SolutionName "$(SolutionName)" -TargetPath "$(TargetPath)" -ManifestGeneratorDir "$(SolutionDir)..\Build_Tools\ManifestGenerator"

#>

[CmdletBinding()]

param (
    [string]$SolutionDir          = $(throw "-SolutionDir is required"),
    [string]$SolutionName         = $(throw "-SolutionName is required"),
    [string]$TargetPath           = $(throw "-TargetPath is required"),
    [string]$ManifestGeneratorDir = $(throw "-ManifestGeneratorDir is required"),
    [string]$Password             = "P@ssw0rd",
    [string]$PFXPath              = "$ManifestGeneratorDir\test.pfx",
    [string]$CertDnsName          = 'intel.com',
    [string]$CertStore            = 'CurrentUser\My' 
)

#----------------[ Declarations ]------------------------------------------------------


#----------------[ Dependency Checks ]------------------------------------------------------

$ManifestGeneratorPath = "$ManifestGeneratorDir\Intel Unite Manifest Tool.exe"
if (!(Test-Path "$ManifestGeneratorPath")) {
    throw "$ManifestGeneratorPath Does Not Exist"
}

if (!(Test-Path "$SolutionDir")) {
    throw "$ManifestGeneratorPath Does Not Exist"
}

if (!(Test-Path "$TargetPath")) {
    throw "$TargetPath Does Not Exist, This should be the compiled dll from the project"
}

$signtoolPath = $(Resolve-Path  "C:\Program Files (x86)\Windows Kits\10\bin\*\x64\signtool.exe" | select-object -index 0).Path
if (!(Test-Path "$signtoolPath")) {
    throw "$signtoolPath Does Not Exist, install Windows 10 SDK"
}

#----------------[ Functions ]---------------------------------------------------------
Function CreateCab{
    Param(
        [string]$CabPath              = $(throw "-CabPath is required"),
        [string]$TargetPath           = $(throw "-TargetPath is required"),
        [string]$ManifestGeneratorDir = $(throw "-ManifestGeneratorDir is required")
    )
    & "$ManifestGeneratorPath" -m "$TargetPath" -o "$CabPath" -w
}

Function CreateCertificate{
    Param(
        [string]$Password     = "P@ssw0rd",
        [string]$PFXPath      = "$ManifestGeneratorDir\test.pfx",
        [string]$CertDnsName  = 'intel.com',
        [string]$CertStore    = 'CurrentUser\My'
    )

    $CertPassword = ConvertTo-SecureString -String $Password -Force –AsPlainText
    $Cert = New-SelfSignedCertificate -Subject "CN=$env:UserName" -DnsName $CertDnsName -Type CodeSigning -CertStoreLocation Cert:\$CertStore
    Export-PfxCertificate -Cert "cert:\$($CertStore)\$($Cert.Thumbprint)" -FilePath "$PFXPath" -Password $CertPassword
}

Function SignCab{
    Param(
        [string]$PFXPath      = $(throw "-PFXPath is required"),
        [string]$Password     = $(throw "-Password is required"),
        [string]$CabPath      = $(throw "-CabPath is required")
    )
    $signtoolPath = $(Resolve-Path  "C:\Program Files (x86)\Windows Kits\10\bin\*\x64\signtool.exe" | select-object -index 0).Path
    Write-Output $signtoolPath sign /v /f "$PFXPath" /t http://timestamp.digicert.com /p $Password "$CabPath"
    & $signtoolPath sign /v /f "$PFXPath" /fd SHA256 /t http://timestamp.digicert.com /p $Password "$CabPath"
}

#----------------[ Main Execution ]----------------------------------------------------

$CabDir = "$SolutionDir\Builds"
if(!(Test-Path $CabDir)){ New-Item -ItemType Directory -Path $CabDir}
$CabPath = "$($SolutionDir)\Builds\$($SolutionName).cab"
 
CreateCab -CabPath "$CabPath" -TargetPath "$TargetPath" -ManifestGeneratorDir "$ManifestGeneratorDir"

if (!(Test-Path $PFXPath)) {
    CreateCertificate -Password $Password -PFXPath $PFXPath -CertDnsName $CertDnsName -CertStore $CertStore
} Else {
    Echo "Certificate $PFXPath already Exists"
}

SignCab -PFXPath $PFXPath -Password $Password -CabPath $CabPath 

exit 0