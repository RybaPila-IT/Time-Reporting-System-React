using System;

namespace TimeReportingSystem.Models
{   
    public class Activity
    {
        public int Id { get; set; }

        public string ProjectId { get; set; }

        public string MonthId { get; set; }

        public string Subactivity { get; set; }

        public int Time { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }
    }
}