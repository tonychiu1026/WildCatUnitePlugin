
Date Modified:  05/24/2017

This program will create a COS report from Protex in 2 different formats; HTML and .XLS

I am listing the Current Servers here:

	https://baipscn01.intel.com
	https://gkipscn01.intel.com
	https://iilipscn01.intel.com
	https://jfipscn01.intel.com
	https://jfipscn02.intel.com
	https://jfipscn03.intel.com
	https://jfipscn04.intel.com
	https://jfipscn05.intel.com
	https://jfipscn06.intel.com
	https://nnsipscn01.inn.intel.com
	https://scipscn02.intel.com
	https://scipscn03.intel.com
	https://shipscn01.intel.com
	https://imuipscn01.intel.com


You will need the following parameters:
	Server URL
	Your Protex username
	Your Protex password
	Project ID
	The name for the report - sans extension. (Use "" around report name if there are any spaces)
	
The parameters should be entered in this order:

	Server URL - use from the list above
	Your Protex username
	Your Protex password
	Your Project ID - You can find these by running the script FindUsersProjectIds found in the same location as the GetCOSReport script.
	Name of Report to generate.
	
To excecute the program, enter the following command:

java -Djava.util.logging.config.file=etc/logging.properties -jar GetCOSReport.jar <ServerURL> <Your Protex username> <Your Protex password> <ProjectId> <Name of Report>

A GetCOSReport.bat file has been included if you wish to use it.  Just replace the bracketed information with the parameters they represent and then save the .bat file.  Double clicking on the .bat file will start the script.

The only difference between this report and the Modified report is that the Modified report includes the license text for all licenses used in the project.  This is not a requirement so don't feel you have to use the modified script.

05/24/2017 Modification:  Removed the "Searches" section of the report as this has been shown to slow down both creation of the report in Excel format and afterward slow down the entire server until it is rebooted.
01/24/2018 Modification: Changed from an Ad Hoc report to using the template to generate the report.  Updated some SDK calls for speed.





