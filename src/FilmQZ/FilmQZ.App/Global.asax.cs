using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using FilmQZ.App.App_Start;
using Ninject.Web.Common.WebHost;
using Ninject;
using Ninject.Web.WebApi;
using FilmQZ.App.Authentication;
using FilmQZ.Core;
using Microsoft.AspNet.Identity.EntityFramework;
using Ninject.Web.Common;
using Ninject.Web.WebApi.Filter;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.AspNet.Identity.Owin;
using Ninject.Extensions.Conventions;
using log4net.Config;
using FilmQZ.Core.Logging;

namespace FilmQZ.App
{
    public class Global : NinjectHttpApplication
    {
        protected override IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            RegisterServices(kernel);
            //GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);

            return kernel;
        }

        protected override void OnApplicationStarted()
        {
            XmlConfigurator.Configure();
            base.OnApplicationStarted();

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<DatabaseContext>().ToSelf().InRequestScope();


            kernel.Bind<IUserStore<ApplicationUser>>().To<UserStore<ApplicationUser>>()
                        .InRequestScope()
                        .WithConstructorArgument("context", kernel.Get<AuthorizationDbContext>());

            kernel.Bind<IOwinContext>().ToMethod(c => kernel.Get<HttpContextBase>().Request.GetOwinContext()).InRequestScope();

            kernel.Bind<AuthorizationDbContext>().ToMethod(c => kernel.Get<IOwinContext>().Get<AuthorizationDbContext>()).InRequestScope();

            kernel.Bind<ApplicationUserManager>()
                .ToMethod(c => kernel.Get<IOwinContext>().GetUserManager<ApplicationUserManager>())
                .InRequestScope();

            kernel.Bind<LogHelper>().ToMethod(c => LogHelper.GetHelper(c.Request.ParentRequest.Service)).InTransientScope();

            kernel.Bind(k => k.FromThisAssembly().SelectAllClasses().EndingWith("Helpers").BindToSelf().Configure(c => c.InRequestScope()));
        }
    }
}