using GssTicket.DataLayer.Context;
using GssTicket.DataLayer.Intefaces;
using GssTicket.DataLayer.Model;
using GssTicket.DataLayer.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GssTicket.Controllers
{
     [Route("api/[controller]")]
    public class ServicesTypeController :Controller
    {
        private IUnitOfwork<ServicesType> _UnitOfwork;
        public ServicesTypeController(IUnitOfwork<ServicesType> UnitOfwork )
        {
            _UnitOfwork = UnitOfwork;
        }
         [HttpGet("[action]")]
        public IActionResult GetServicesType()
        {
           
            var allServicesType = _UnitOfwork.entity.GetAll();
             return Ok(allServicesType);
            
           
            
        }

        [HttpGet("SingleServicesType/{id}")]
        public IActionResult GetServicesTypeById(int id)
        {
            var ServicesType =  _UnitOfwork.entity.GetByID(id);
            return Ok(ServicesType);
        }

        [HttpPost("AddServicesType")]
        public IActionResult AddServicesType([FromBody]ServicesType ServicesType)
        {
            if(ServicesType != null) 
            {
                 _UnitOfwork.entity.Insert(ServicesType);
            }
            return Ok();
        }

        [HttpPut("UpdateServicesType/{id}")]
        public IActionResult UpdateServicesType(int id,[FromBody]ServicesType ServicesType)
        {
            _UnitOfwork.entity.UpdateServicesType(id,ServicesType);        
          return Ok(ServicesType);

        }

        [HttpDelete("DeleteServicesType/{id}")]
        public IActionResult DeleteServicesType(int id)
        {
             _UnitOfwork.entity.Delete(id);
            return Ok();
        }
    }
}