using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TimeReportingSystem.DataAccess;
using TimeReportingSystem.Models;

namespace TimeReportingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ActivityController : ControllerBase
    {

        private readonly Context _db;
        
        public ActivityController(Context context)
        {
            _db = context;
        }

        private void EnsureMonthExistence(string id)
        {
            var month = _db.Months.SingleOrDefault(month => id == month.Id);
            if (month == null)
            {
                _db.Months.Add(new Month { Id = id, Active = true });
                _db.SaveChanges();
            }
        }


        [HttpGet]
        public JsonResult Select(string username, DateTime date)
        {
            if (username == null)
            {
                return new JsonResult(new { message = "username can not be null!" })
                {
                    StatusCode = (int?)HttpStatusCode.BadRequest
                };
            }
            try
            {
                EnsureMonthExistence(MonthKey(username, date));

                var month = _db.Months.SingleOrDefault(month => month.Id == MonthKey(username, date));
                var activities = _db.Activities.Where(activity => activity.MonthId == MonthKey(username, date) &&
                                                                  activity.Date    == date);

                return new JsonResult( 
                    new
                    {
                        month.Active,
                        Activities = activities
                    }
                    );
            } 
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message }) {
                    StatusCode = (int?) HttpStatusCode.InternalServerError
                };
            }
        }

        [HttpPost]
        public JsonResult Add(Activity activity)
        {
            var monthId = activity.MonthId;
            var projectId = activity.ProjectId;

            if (monthId == null || projectId == null)
            {
                return new JsonResult(new { message = "reported activity is corrupted!" })
                {
                    StatusCode = (int?)HttpStatusCode.BadRequest
                };
            }

            try
            {
                EnsureMonthExistence(monthId);

                if (!_db.Months.Single(month => monthId == month.Id).Active)
                {
                    return new JsonResult(new { message = "month is frozen!" })
                    {
                        StatusCode = (int?)HttpStatusCode.BadRequest
                    };
                }

                _db.Activities.Add(activity);
                _db.SaveChanges();

                return new JsonResult(new {activity.Id});
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message } )
                {
                    StatusCode = (int?)HttpStatusCode.InternalServerError
                };
            }
        }
        
        [HttpDelete]
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                return new JsonResult(new { message = "id can not be null!" })
                {
                    StatusCode = (int?)HttpStatusCode.BadRequest
                };
            }

            try
            {
                var activity = _db.Activities.SingleOrDefault(activity => id == activity.Id);

                if (activity == null)
                {
                    return new JsonResult(new { message = "activity does not exist!" })
                    {
                        StatusCode = (int?)HttpStatusCode.BadRequest
                    };
                }

                var month = _db.Months.Single(month => activity.MonthId == month.Id);

                if (month != null && !month.Active)
                {
                    return new JsonResult(new { message = "month is frozen!" })
                    {
                        StatusCode = (int?)HttpStatusCode.BadRequest
                    };
                }

                _db.Activities.Remove(activity);
                _db.SaveChanges();
            } 
            catch (Exception ex)
            {
                return new JsonResult(new {message = ex.Message}) {
                    StatusCode = (int?) HttpStatusCode.InternalServerError
                };
            }
            return new JsonResult(new {message = "OK"});
        }

        
        [HttpPut]
        public JsonResult Update(Activity activity)
        {
            var monthId = activity.MonthId;
            var projectId = activity.ProjectId;

            if (monthId == null || projectId == null)
            {
                return new JsonResult(new { message = "activity to update is corrupted!" })
                {
                    StatusCode = (int?)HttpStatusCode.BadRequest
                };
            }

            try
            {
                var month = _db.Months.Single(month => activity.MonthId == month.Id);

                if (month != null && !month.Active)
                {
                    return new JsonResult(new { message = "month is frozen!" })
                    {
                        StatusCode = (int?)HttpStatusCode.BadRequest
                    };
                }

                _db.Activities.Update(activity);
                _db.SaveChanges();
            } 
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message })
                {
                    StatusCode = (int?)HttpStatusCode.InternalServerError
                };
            }
            return new JsonResult(new { message = "OK" });
        }

        private static string MonthKey(string username, DateTime month)
        {
            return $"{username}-{month:yyy-MM}";
        }
    }
}