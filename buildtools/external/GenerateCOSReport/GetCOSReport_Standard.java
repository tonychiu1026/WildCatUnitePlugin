

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.blackducksoftware.sdk.fault.SdkFault;
import com.blackducksoftware.sdk.protex.client.util.BDProtexSample;
import com.blackducksoftware.sdk.protex.client.util.ProtexServerProxy;
import com.blackducksoftware.sdk.protex.report.Report;
import com.blackducksoftware.sdk.protex.report.ReportApi;
import com.blackducksoftware.sdk.protex.report.ReportFormat;


/**
 * This sample generates COS report and writes it to a file in HTML and xls
 *
 * It demonstrates:
 * - How to generate a report from a client side supplied template
 * - How to receive this report and write it to a file (using MTOM - Attachments)
 */
public class GetCOSReport_Standard extends BDProtexSample {


	static Logger log = Logger.getLogger(GetCOSReport_Standard.class);
	static String reportTemplateId = "scs_basereportforedittoincludeprojectname";
	
	
	
	
	
	
    private static void usage() {
        // Trick to get the class name in a static way
        Exception e = new Exception();
        StackTraceElement[] sTrace = e.getStackTrace();
        // sTrace[0] will be always there
        String className = sTrace[0].getClassName();
        System.out.println(className.substring(className.lastIndexOf(".") + 1) + " "
                + " <ServerURL> + <Username> + <User password> + <project ID>" + " <report file name>" );
        System.out.println("");
        
        System.out.println("  ServerURL  - the server where the project is located, e.g., https://jfipscn02.intel.com/");
        System.out.println("  UserName   - user's email address, e.g., judy.m.hartley@intel.com");
        System.out.println("  User Password - the user's Network password, e.g., dontknow.");
        System.out.println("  project ID - the project ID of the project to list, e.g., c_testproject");
        System.out.println("  report filename - sans extension"); 
    }

    public static void main(String[] args) throws Exception {
        // check and save parameters
        if (args.length < 5) {
            System.err.println("Not enough Parameters!");
            usage();
            System.exit(-1);
        }

        String serverUri = args[0];
        String username = args[1];
        String password = args[2];
        String projectId = args[3];
        String reportFileName = args[4];
        
       
        
        
        //this could be added as a parameter,but currently users want this automatically.
        String tableOfContents = "true";
        
        Properties log4jProperties = new Properties();
		log4jProperties.setProperty("log4j.rootLogger", "ERROR, myConsoleAppender");
		log4jProperties.setProperty("log4j.appender.myConsoleAppender", "org.apache.log4j.ConsoleAppender");
		log4jProperties.setProperty("log4j.appender.myConsoleAppender.layout", "org.apache.log4j.PatternLayout");
		log4jProperties.setProperty("log4j.appender.myConsoleAppender.layout.ConversionPattern", "%-5p %c %x - %m%n");
		PropertyConfigurator.configure(log4jProperties);


        ReportApi reportApi = null;
      
        try {
            Long connectionTimeout = 120 * 1000L;
            System.setProperty(ProtexServerProxy.PROTEX_SDK_INFO_PROPERTY, "false");
            @SuppressWarnings("resource")
			ProtexServerProxy myProtexServer = new ProtexServerProxy(serverUri, username, password,
                    connectionTimeout);

            reportApi = myProtexServer.getReportApi(ProtexServerProxy.INDEFINITE_TIMEOUT);
            

       } catch (RuntimeException e) {
            System.err.println("Connection to server '" + serverUri + "' failed: " + e.getMessage());
            System.exit(-1);
        }
        
     // Call the Api
        Report reportHTML = null;
        Report reportXLS = null;
        
        Boolean showTOC = Boolean.valueOf("true".equals(tableOfContents));

        try {
            reportHTML = reportApi.generateProjectReport(projectId, reportTemplateId,ReportFormat.HTML, showTOC);
            reportXLS = reportApi.generateProjectReport(projectId, reportTemplateId, ReportFormat.XLS, showTOC);
          
        } catch (SdkFault e) {
            System.err.println("generateProjectReport failed: " + e.getMessage());
            throw new RuntimeException(e);
        }

     

            // Check for valid return
            if (reportHTML == null || reportXLS == null) {
                System.err.println("unexpected return object");
                System.exit(-1);
            }

            if (reportHTML.getFileName() == null || reportXLS.getFileName() == null) {
                System.err.println("unexpected return object: File name can't be null or empty");
                System.exit(-1);
            }

            if (reportHTML.getFileContent() == null || reportXLS.getFileContent() == null) {
                System.err.println("unexpected return object: File content can't be null or empty");
                System.exit(-1);
            }

            File transferredFileHTML = new File(reportFileName + ".html");
            File transferredFileXLS = new File(reportFileName + ".xls");
            FileOutputStream outStream = null;
            try {

                outStream = new FileOutputStream(transferredFileHTML);
                reportHTML.getFileContent().writeTo(outStream);
            } catch (IOException e) {
                System.err.println("report.getFileContent().writeTo() failed: " + e.getMessage());
                System.exit(-1);
            } finally {
                if (outStream != null) {
                    outStream.close();
                }
            }
            System.out.println("\nHTML Report written to: " + transferredFileHTML.getAbsolutePath());

            try {

                outStream = new FileOutputStream(transferredFileXLS);
                reportXLS.getFileContent().writeTo(outStream);
            } catch (IOException e) {
                System.err.println("report.getFileContent().writeTo() failed: " + e.getMessage());
                System.exit(-1);
            } finally {
                if (outStream != null) {
                    outStream.close();
                }
            }
            System.out.println("\nXLS Report written to: " + transferredFileXLS.getAbsolutePath());
       
    
   

    }

}
