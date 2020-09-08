using System.Collections.Generic;
using GssTicket.DataLayer.Model;

namespace GssTicket.DataLayer.Intefaces
 {
     public interface IGenericRepository<T> where T :class
     {
       IEnumerable<T> GetAll();
        T GetByID(int id);
        void Insert(T entity);
        void Update(T entity);
         void UpdateDepartments(int id , Departments Departments );
         void UpdateLocations(int id , Locations locations );
         void UpdateAssigns(int id , Assigns Assigns );
         void UpdateServicesType(int id , ServicesType ServicesType );
          void UpdateTickets(int id, Tickets Tickets);

        void Delete(int id);
     }
 }