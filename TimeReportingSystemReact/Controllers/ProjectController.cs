using System;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using TimeReportingSystem.DataAccess;

namespace TimeReportingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProjectController : ControllerBase
    {
        private readonly Context _db;

        public ProjectController(Context db)
        {
            _db = db;
        }

        [HttpGet]
        public JsonResult Select(string id, bool? active)
        {
            try
            {
                return new JsonResult(
                        _db.Projects
                            .Where(
                                project => (active == null || active == project.Active) &&
                                           (id == null || id == project.Id)
                            )
                            ?.ToList()
                    );
            } 
            catch (Exception ex)
            {
                return new JsonResult(new {message = ex.Message})
                {
                    StatusCode = (int?) HttpStatusCode.InternalServerError,
                };
            }
        }
    }
}