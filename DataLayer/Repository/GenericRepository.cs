using System.Collections.Generic;
using System.Linq;
using GssTicket.DataLayer.Context;
using GssTicket.DataLayer.Intefaces;
using GssTicket.DataLayer.Model;
using Microsoft.EntityFrameworkCore;

namespace GssTicket.DataLayer.Repository
 {
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
       private TicketsContext _TicketsContext;
        private DbSet<T> table =null;
        public GenericRepository(TicketsContext TicketsContext)
        {
            _TicketsContext = TicketsContext;
            table = _TicketsContext.Set<T>();
        }
        public void Delete(int id)
        {
            var existing = GetByID(id);
            table.Remove(existing);
            _TicketsContext.SaveChanges();

        }

        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }

        public T GetByID(int id)
        {
            return table.Find(id);
        }

        public void Insert(T entity)
        {
            table.Add(entity);
            _TicketsContext.SaveChanges();
        }

        public void Update(T entity)
        {
        
            table.Attach(entity);
          //  _TicketsContext.Entry(entity).State = EntityState.Modified;
             _TicketsContext.SaveChanges();

        }

        public void UpdateDepartments(int id, Departments Departments)
        {
            var e = _TicketsContext.Departments.Where(m=>m.DepartmentID == id).FirstOrDefault();
            if (e != null ){
                e.DepartmentName = Departments.DepartmentName;
                e.DepartmentName_AR = Departments.DepartmentName_AR;
                _TicketsContext.SaveChanges();
            }
        }

        public void UpdateLocations(int id, Locations locations)
        {
            var e = _TicketsContext.Locations.Where(m=>m.LocationID == id).FirstOrDefault();
            if (e != null )
            {
                e.LocationName = locations.LocationName;
                _TicketsContext.SaveChanges();
            }    
       }       

       public void UpdateAssigns(int id, Assigns Assigns)
        {
            var e = _TicketsContext.Assigns.Where(m=>m.AssignID == id).FirstOrDefault();
            if (e != null )
            {
                e.AssignName = Assigns.AssignName;
                _TicketsContext.SaveChanges();
            }    
       }

        public void UpdateServicesType(int id, ServicesType ServicesType)
        {
             var e = _TicketsContext.ServicesType.Where(m=>m.ServiceTypeID == id).FirstOrDefault();
            if (e != null )
            {
                e.ServiceTypeName = ServicesType.ServiceTypeName;
                _TicketsContext.SaveChanges();
            }    
        }
        
        public void UpdateTickets(int id, Tickets Tickets)
        {
             var e = _TicketsContext.Tickets.Where(m=>m.TicketID == id).FirstOrDefault();
            if (e != null )
            {
                e.TicketDateTime = Tickets.TicketDateTime;
                e.ServiceTypeID = Tickets.ServiceTypeID;
                e.DepartmentID = Tickets.DepartmentID;
                 e.RequesterName = Tickets.RequesterName;
                 e.RequesterEmail = Tickets.RequesterEmail;
                 e.Comments = Tickets.Comments;
                 e.LocationID = Tickets.LocationID;
                 e.AssignID = Tickets.AssignID;
                _TicketsContext.SaveChanges();
            }    
        }
    }
}