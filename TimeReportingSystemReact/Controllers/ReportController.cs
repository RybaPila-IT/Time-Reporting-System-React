using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using TimeReportingSystem.DataAccess;

namespace TimeReportingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ReportController : ControllerBase
    {

        private readonly Context _db;

        public ReportController(Context db)
        {
            _db = db;
        }
        
        [HttpGet]
        public JsonResult Select(string reporter)
        {
            if (reporter == null)
            {
                return new JsonResult(new { message = "Reporter can not be null!" })
                {
                    StatusCode = (int?)HttpStatusCode.BadRequest
                };
            }
            return new JsonResult(_db.Acceptances.Where(acc => acc.Reporter == reporter)?.ToList());
        }
    }
}