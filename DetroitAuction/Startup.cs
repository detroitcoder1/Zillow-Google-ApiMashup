using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DetroitAuction.Startup))]
namespace DetroitAuction
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
