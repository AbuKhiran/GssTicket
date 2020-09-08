using GssTicket.DataLayer.Intefaces;
using GssTicket.DataLayer.Model;
using Microsoft.AspNetCore.Mvc;

namespace GssTicket.Controllers
{
     [Route("api/[controller]")]
    public class TicketController :Controller
    {
        private IUnitOfwork<Tickets> _UnitOfwork;
        public TicketController(IUnitOfwork<Tickets> UnitOfwork )
        {
            _UnitOfwork = UnitOfwork;
        }
         [HttpGet("[action]")]
        public IActionResult GetTickets()
        {
           
            var allTickets = _UnitOfwork.entity.GetAll();
             return Ok(allTickets);
            
           
            
        }

        [HttpGet("SingleTicket/{id}")]
        public IActionResult GetTicketById(int id)
        {
            var Ticket =  _UnitOfwork.entity.GetByID(id);
            return Ok(Ticket);
        }

        [HttpPost("AddTicket")]
        public IActionResult AddTicket([FromBody]Tickets Ticket)
        {
            if(Ticket != null) 
            {
                 _UnitOfwork.entity.Insert(Ticket);
            }
            return Ok();
        }

        [HttpPut("UpdateTicket/{id}")]
        public IActionResult UpdateTicket(int id,[FromBody]Tickets Ticket)
        {
            _UnitOfwork.entity.UpdateTickets(id,Ticket);        
          return Ok(Ticket);

        }

        [HttpDelete("DeleteTicket/{id}")]
        public IActionResult DeleteTicket(int id)
        {
             _UnitOfwork.entity.Delete(id);
            return Ok();
        }
    }
}