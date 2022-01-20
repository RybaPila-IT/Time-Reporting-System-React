using System.ComponentModel.DataAnnotations;

namespace TimeReportingSystem.Models
{
    public class Acceptance
    {
        public int Id { get; set; }
        public string ProjectId { get; set; }
        public string Reporter { get; set; }
        [Required]
        public int TimeReported { get; set; }
        [Required]
        public int TimeAccepted { get; set; }
    }
}
