using System.ComponentModel.DataAnnotations;

namespace GssTicket.DataLayer.Model
 {
     public class Departments
    {
        [Required]
        [Key]
        public int DepartmentID { get; set; }

        public string DepartmentName { get; set; }

        public string DepartmentName_AR { get; set; }
    }
 }