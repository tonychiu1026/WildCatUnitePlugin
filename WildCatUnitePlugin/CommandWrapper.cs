using Intel.Unite.Common.Command.Serialize;
using System;

namespace WildCatUnitePlugin
{
    public class CommandWrapper<T> : BaseCommand<T>
    {
        public CommandWrapper(T t, Guid id) : base((ICommandSerializer)new JsonCommandSerializer(), t, id)
        { }
    }
}