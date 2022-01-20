using System.ComponentModel.DataAnnotations;

namespace TimeReportingSystem.Models
{

    public class Project
    {
        [MaxLength(100)]
        public string Id { get; set; }

        [MaxLength(500)]
        public string Subactivities { get; set; }

        public bool Active { get; set; }
    }
}