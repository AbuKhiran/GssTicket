using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GssTicket.DataLayer.Model
 {
    public class Tickets
    {
        [Required]
        [Key]
        public int TicketID { get; set; }

        [Required]
        public DateTime TicketDateTime { get; set; }

        public int ServiceTypeID { get; set; }

        public int DepartmentID { get; set; }

        [Required]
        public String RequesterName { get; set; }
        
        [Required]
       // [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage = "Invalid Email Address")]
        public String RequesterEmail { get; set; }

        public String Comments { get; set; }

        public int LocationID { get; set; }

        [Required]
        public int AssignID { get; set; }

        public Departments Depaartment { get; set; }

       // [NotMapped]
       // public String AssignName { get; set; }


 

    }
 }