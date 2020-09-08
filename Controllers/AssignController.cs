using GssTicket.DataLayer.Context;
using GssTicket.DataLayer.Intefaces;
using GssTicket.DataLayer.Model;
using GssTicket.DataLayer.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GssTicket.Controllers
{
     [Route("api/[controller]")]
    public class AssignController :Controller
    {
        private IUnitOfwork<Assigns> _UnitOfwork;
        public AssignController(IUnitOfwork<Assigns> UnitOfwork )
        {
            _UnitOfwork = UnitOfwork;
        }
         [HttpGet("[action]")]
        public IActionResult GetAssigns()
        {
           
            var allAssigns = _UnitOfwork.entity.GetAll();
             return Ok(allAssigns);
            
           
            
        }

        [HttpGet("SingleAssign/{id}")]
        public IActionResult GetAssignById(int id)
        {
            var Assign =  _UnitOfwork.entity.GetByID(id);
            return Ok(Assign);
        }

        [HttpPost("AddAssign")]
        public IActionResult AddAssign([FromBody]Assigns Assign)
        {
            if(Assign != null) 
            {
                 _UnitOfwork.entity.Insert(Assign);
            }
            return Ok();
        }

        [HttpPut("UpdateAssign/{id}")]
        public IActionResult UpdateAssign(int id,[FromBody]Assigns Assign)
        {
            _UnitOfwork.entity.UpdateAssigns(id,Assign);        
          return Ok(Assign);

        }

        [HttpDelete("DeleteAssign/{id}")]
        public IActionResult DeleteAssign(int id)
        {
             _UnitOfwork.entity.Delete(id);
            return Ok();
        }
    }
}