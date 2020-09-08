using System.ComponentModel.DataAnnotations;

namespace GssTicket.DataLayer.Model
 {
    public class Locations
    {
        [Required]
        [Key]
        public int LocationID { get; set; }

        [Required]
        public string LocationName { get; set; }
    }  
 }