namespace GssTicket.DataLayer.Intefaces
 {
     public interface IUnitOfwork<T> where T:class
     {
         IGenericRepository<T> entity { get; }
        void save();
     }
 }