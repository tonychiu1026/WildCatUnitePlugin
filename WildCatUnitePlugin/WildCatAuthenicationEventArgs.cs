using System;

namespace WildCatUnitePlugin
{
    [Serializable]
    public class WildCatAuthenicationEventArgs : EventArgs
    {
        public string AuthenticationArgument { get; set; }
    }
}
