using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WildCatUnitePlugin.UI
{
    /// <summary>
    /// Interaction logic for ClientIcon.xaml
    /// </summary>
    public partial class ClientIcon : UserControl
    {
        public ClientIcon()
        {
            InitializeComponent();
        }

        public void QuickAccessButton_Click(object sender, RoutedEventArgs e)
        {
#if Debug
            var dir = Directory.GetCurrentDirectory();
#endif
            try
            {
                using (Process myProcess = new Process())
                {
                    myProcess.StartInfo.UseShellExecute = false;
                    myProcess.StartInfo.FileName = "./FeatureModules/59326676-1efa-4120-b99a-8500b8be1469/Appdata/SurgeryQuest.exe";
                    myProcess.StartInfo.Arguments = "\"username\" \"password\"";
                    myProcess.Start();
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
            }
        }
    }
}
