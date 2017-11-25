using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Logging
{
    public class LogHelper
    {
        private static readonly IDictionary<Type, LogHelper> Loggers = new Dictionary<Type, LogHelper>();
        private readonly ILog logger;

        private LogHelper(ILog logger)
        {
            this.logger = logger;
        }

        public static LogHelper GetHelper(Type type)
        {
            if (Loggers.TryGetValue(type, out var helper) == false)
            {
                var logger = LogManager.GetLogger(type);
                helper = new LogHelper(logger);
                Loggers.Add(type, helper);
            }

            return helper;
        }
    }
}
