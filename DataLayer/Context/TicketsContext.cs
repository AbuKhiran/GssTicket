using GssTicket.DataLayer.Model;
using Microsoft.EntityFrameworkCore;

namespace GssTicket.DataLayer.Context
 {
      public class TicketsContext:DbContext
    {
        public TicketsContext(DbContextOptions<TicketsContext> options):base(options)
        {

        }
       public DbSet<Assigns> Assigns { get; set; }
       public DbSet<Departments> Departments { get; set; }
        public DbSet<Locations> Locations { get; set; }
        public DbSet<ServicesType> ServicesType { get; set; }
        public DbSet<Tickets> Tickets { get; set; }

    }
 }