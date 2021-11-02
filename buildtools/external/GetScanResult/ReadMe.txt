GetScanResult.java collects the scan analysis summary (# files scanned; # Pending identification; # Licencen conflicts; etc) 
of a protex Project passed is as argument. If the project is scanned, the analysis are written to the outfile passed in as 
argument. Else, throws an exception

How to Execute:
java -jar GetScanResult.jar <Protex server URL> <User ID> <User Password> <Project ID> <Output Path\Filename>

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

Input Parameters:
		IN arg[0] - Protex server URL
		IN arg[1] - Protex username(Intel Email Address)
		IN arg[2] - password for the username
		IN arg[3] - Project ID  (Wiki page on how to find Project Id: https://wiki.ith.intel.com/x/dxiKMQ)
		OUT arg[4] - location of output xml file including the name of the file and the extention (.xml)

Example:
java -Djava.util.logging.config.file=etc/logging.properties -jar GetScanResult.jar http://jfipscn01.intel.com abc@intel.com abc c_test_k_5271 c:\ScanResults\Project_Scan_result.xml
	
IMPORTANT:  If your path to where the report will be stored uses any spaces, surround the path with quotes.  e.g. ("c:\Scan Results\Project_Scan_result.xml")

You may modify the GetScanResult.bat file to contain all of the parameters if you wish and then double click on it to run the script with those parameters or use a command line window
as the example above shows.

Output:
c:\ScanResults\Project_Scan_result.xml (Will contain scan result)

