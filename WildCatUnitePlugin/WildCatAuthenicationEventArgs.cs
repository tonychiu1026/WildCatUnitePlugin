using System;

namespace WildCatUnitePlugin
{
    [Serializable]
    public class WildCatAuthenicationEventArgs : EventArgs
    {
        private string _authenticationArgument;
        public WildCatAuthenicationEventArgs(string authenticationArgument)
        {
            _authenticationArgument = authenticationArgument ?? throw new ArgumentNullException(nameof(authenticationArgument));
        }

        public string AuthenticationArgument => _authenticationArgument;
    }
}
