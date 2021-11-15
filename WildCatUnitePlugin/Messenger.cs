using Intel.Unite.Common.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WildCatUnitePlugin
{
    public class Messenger<T>
    {
        public void InvokeSubscriptions(Message message)
        {
            OnReceivedMessage(ConvertMessage<T>.Deserialize(message));
        }

        private void OnReceivedMessage(object o)
        {
            //MessagingEventBroker.GlobalEventBroker.Fire("topic://" + typeof(T).Name, this, HandlerRestriction.None, this, (EventArgs)o);
        }
    }

}
