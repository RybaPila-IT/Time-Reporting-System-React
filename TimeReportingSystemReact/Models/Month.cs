using System.Collections.Generic;

namespace TimeReportingSystem.Models
{
    public class Month
    {
        public string Id { get; set; }

        public bool Active { get; set; }

        public List<Activity> Activities { get; set; }
    }
}
