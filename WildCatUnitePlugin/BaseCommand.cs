using System;
using Intel.Unite.Common.Command;
using Intel.Unite.Common.Command.Serialize;
using UnitePlugin.Model.EventArguments;

namespace WildCatUnitePlugin
{
    public class BaseCommand<T> : CommandBase
    {
        public Guid ModuleId;
        public T EventArgs;
        public string EventArgsAsString = string.Empty;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="commandSerializer">Desired serializer</param>
        /// <param name="t">Target type of the EventArg</param>
        /// <param name="moduleId">Plugins module id</param>
        public BaseCommand(ICommandSerializer commandSerializer, T t, Guid moduleId) : base(commandSerializer)
        {
            EventArgs = t;
            EventArgsAsString = typeof(T).Name;
            ModuleId = moduleId;
        }

        public override string PrintObject()
        {
            return GetType().Name;
        }

        /// <summary>
        /// Method used to create a Message for messaging.
        /// </summary>
        /// <returns>The desired Message</returns>
        public override Message ToMessage()
        {
            return ToAllHubPluginsMessage();
        }


        public Message ToTargetHubPluginMessage(Guid guid)
        {
            Message msg = GenerateMessageBase();
            msg.TargetId = MessageConstants.TargetLocalhostId;
            msg.TargetModuleId = guid;
            return msg;
        }

        public Message ToAllHubPluginsMessage()
        {
            Message msg = GenerateMessageBase();
            msg.TargetId = MessageConstants.TargetLocalhostId;
            msg.TargetModuleId = MessageConstants.TargetModuleBroadcastId;
            return msg;
        }

        public Message ToTargetClientPluginMessage(Guid guid)
        {
            Message msg = GenerateMessageBase();
            msg.TargetId = MessageConstants.TargetBroadcastId;
            msg.TargetModuleId = guid;
            return msg;
        }

        public Message ToAllClientPluginsMessage()
        {
            Message msg = GenerateMessageBase();
            msg.TargetId = MessageConstants.TargetBroadcastId;
            msg.TargetModuleId = MessageConstants.TargetModuleBroadcastId;
            return msg;
        }


        private Message GenerateMessageBase()
        {

            Message message = new Message
            {
                Priority = MessagePriority.High,
                Data = CommandSerializer.Serialize(EventArgs),
                DataType = (int)Enum.Parse(typeof(EventArgumentTypes), EventArgsAsString),
                SourceModuleId = ModuleId,
            };
            return message;
        }

    }
}
