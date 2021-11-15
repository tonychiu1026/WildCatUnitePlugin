using System;

namespace WildCatUnitePlugin
{
    [Serializable]
    public class WildCatAuthenicationEventArgs : EventArgs
    {
        private string _username;
        private string _password;
        public WildCatAuthenicationEventArgs(string username, string password)
        {
            _username = username ?? throw new ArgumentNullException(nameof(username));
            _password = password ?? throw new ArgumentNullException(nameof(password));
        }

        public string Username => _username;
        public string Password => _password;
    }
}
