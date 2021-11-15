using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Intel.Unite.Common.Command;
using Intel.Unite.Common.Command.Serialize;



namespace WildCatUnitePlugin
{
    /// <summary>
    /// Helper class to convert generic event args
    /// </summary>
    /// <typeparam name="T">The generic typ eto convert</typeparam>
    public static class ConvertMessage<T>
    {
        /// <summary>
        /// Method to deserialize the Message to the target generic type
        /// </summary>
        /// <param name="message">Incoming Message to convert</param>
        /// <returns>The converted generic message</returns>
        public static T Deserialize(Message message)
        {
            return new JsonCommandSerializer().Deserialize<T>(message.Data);
        }
    }
}
