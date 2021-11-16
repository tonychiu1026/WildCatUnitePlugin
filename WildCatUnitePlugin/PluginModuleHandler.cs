using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Threading;
using Intel.Unite.Common.Command;
using Intel.Unite.Common.Context;
using Intel.Unite.Common.Core;
using Intel.Unite.Common.Manifest;
using Intel.Unite.Common.Module.Common;
using Intel.Unite.Common.Module.Feature.Hub;
using Intel.Unite.Common.Logging;
using Intel.Unite.Common.Command.Serialize;
using Intel.Unite.Common.Module.Feature.Client;

namespace WildCatUnitePlugin
{
    public class PluginModuleHandler : ClientFeatureModuleBase
    {
        private const string _guid = "59326676-1efa-4120-b99a-8500b8be1469";
        private const string _name = "Wild Cat Plugin Authenticator";
        private const string _description = "Program to launch apps";
        private const string _copyright = "University Of Kentucky";
        private const string _vendor = "University Of Kentucky";
        private const string _version = "1.0.0.3";

        private static readonly ModuleInfo _moduleInfo = new ModuleInfo
        {
            ModuleType = ModuleType.Feature,
            Id = Guid.Parse(_guid),
            Name = _name,
            Description = _description,
            Copyright = _copyright,
            Vendor = _vendor,
            Version = Version.Parse(_version),
            SupportedPlatforms = ModuleSupportedPlatform.Mac | ModuleSupportedPlatform.Windows,
        };

        private const string _minimumUniteVersion = "4.0.0.0";
        private const string _entryPoint = "WildCatUnitePlugin.dll";

        private static readonly ManifestOsSet _files = new ManifestOsSet
        {
            Windows = new Collection<ManifestFile>
        {
        new ManifestFile()
        {
            SourcePath = _entryPoint,
            TargetPath = _entryPoint,
        }
        }
        };

        private static readonly ModuleManifest _moduleManifest = new ModuleManifest
        {
            Owner = UniteModuleOwner.Hub,
            ModuleId = _moduleInfo.Id,
            Name = new MultiLanguageString(_moduleInfo.Name),
            Description = new MultiLanguageString(_moduleInfo.Description),
            ModuleVersion = _moduleInfo.Version,
            MinimumUniteVersion = Version.Parse(_minimumUniteVersion),
            Settings = new Collection<ConfigurationSetting>(),
            Files = _files,
            Installers = new Collection<ManifestInstaller>(),
            EntryPoint = _entryPoint,
            ModuleType = _moduleInfo.ModuleType,
        };

       
        public PluginModuleHandler()
        {
        }

        public PluginModuleHandler(IModuleRuntimeContext runtimeContext) : base(runtimeContext)
        {
        }

        public override string HtmlUrlOrContent => null;

        public override Dispatcher CurrentUiDispatcher { get; set;}

        public override ModuleManifest ModuleManifest => _moduleManifest;

        public override ModuleInfo ModuleInfo => _moduleInfo;

        public override void HubConnected(HubInfo hubInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void HubDisconnected(HubInfo hubInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void HubInfoChanged(HubInfo hubInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void IncomingMessage(Message message)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
            //This is where you will consume messages... 
        }

        public override void Load()
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override bool OkToSleepDisplay()
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
            return true;
        }

        public override void SessionKeyChanged(KeyValuePair sessionKey)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void Unload()
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void UserConnected(UserInfo userInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
            //RuntimeContext.MessageSender.TrySendMessage(GetWildacateAuthenticationMessage());
        }

        public override void UserDisconnected(UserInfo userInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void UserInfoChanged(UserInfo userInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        //private Message GetWildacateAuthenticationMessage()
        //{
        //    return new CommandWrapper<WildCatAuthenicationEventArgs>(
        //        new WildCatAuthenicationEventArgs("username", "password"), ModuleInfo.Id)
        //        .ToTargetClientPluginMessage(Guid.NewGuid());
        //}

        public override void OnConnectionReady(UserInfo hubInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }

        public override void OnConnectionLost(UserInfo hubInfo)
        {
            RuntimeContext.LogManager.LogMessage(ModuleInfo.Id, LogLevel.Info, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
        }
    }
}
