using Microsoft.AspNetCore.Mvc;

namespace TimeReportingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class HealthController : ControllerBase
    {
        public JsonResult Check()
        {
            return new JsonResult(new { message = "OK" });
        }
    }
}
