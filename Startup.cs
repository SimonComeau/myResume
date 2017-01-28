using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(myResumeAPI.Startup))]

namespace myResumeAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
