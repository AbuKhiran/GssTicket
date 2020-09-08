using System.ComponentModel.DataAnnotations;

namespace GssTicket.DataLayer.Model
 {
    public class Assigns
    {
        [Required]
        [Key]
        public int AssignID { get; set; }

        [Required]
        public string AssignName { get; set; }

    } 
 }