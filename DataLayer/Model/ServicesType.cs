using System.ComponentModel.DataAnnotations;

namespace GssTicket.DataLayer.Model
 {
       public class ServicesType
    {
        [Required]
        [Key]
        public int ServiceTypeID { get; set; }

        [Required]
        public string ServiceTypeName { get; set; }
    }
 }