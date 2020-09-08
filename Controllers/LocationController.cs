using GssTicket.DataLayer.Context;
using GssTicket.DataLayer.Intefaces;
using GssTicket.DataLayer.Model;
using Microsoft.AspNetCore.Mvc;

namespace GssTicket.Controllers
{
     [Route("api/[controller]")]
    public class LocationController :Controller
    {
        private IUnitOfwork<Locations> _UnitOfwork;
        public LocationController(IUnitOfwork<Locations> UnitOfwork )
        {
            _UnitOfwork = UnitOfwork;
        }
         [HttpGet("[action]")]
        public IActionResult GetLocations()
        {
           
            var allLocations = _UnitOfwork.entity.GetAll();
             return Ok(allLocations);           
                      
        }

        [HttpGet("SingleLocation/{id}")]
        public IActionResult GetLocationById(int id)
        {
            var Location =  _UnitOfwork.entity.GetByID(id);
            return Ok(Location);
        }

        [HttpPost("AddLocation")]
        public IActionResult AddLocation([FromBody]Locations Location)
        {
            if(Location != null) 
            {
                 _UnitOfwork.entity.Insert(Location);
            }
            return Ok();
        }

        [HttpPut("UpdateLocation/{id}")]
        public IActionResult UpdateLocation(int id,[FromBody]Locations Location)
        {
            _UnitOfwork.entity.UpdateLocations(id,Location);        
          return Ok(Location);

        }

        [HttpDelete("DeleteLocation/{id}")]
        public IActionResult DeleteLocation(int id)
        {
             _UnitOfwork.entity.Delete(id);
            return Ok();
        }
    }
}