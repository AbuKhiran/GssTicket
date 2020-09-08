using System.Collections.Generic;
using GssTicket.DataLayer.Context;
using GssTicket.DataLayer.Intefaces;

namespace GssTicket.DataLayer.Repository
 {
    public class UnitOfwork<T> : IUnitOfwork<T> where T : class
    {
       private TicketsContext _TicketsContext;
        private  IGenericRepository<T> _entity;

        public UnitOfwork(TicketsContext TicketsContext)
        {
            _TicketsContext = TicketsContext;
        }
        public IGenericRepository<T> entity {
            get {
                return _entity ?? (_entity = new GenericRepository<T>(_TicketsContext));
            }
        }

        public void save()
        {
            _TicketsContext.SaveChanges();
        }
    }
}