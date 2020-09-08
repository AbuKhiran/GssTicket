using GssTicket.DataLayer.Context;
using GssTicket.DataLayer.Intefaces;
using GssTicket.DataLayer.Model;
using GssTicket.DataLayer.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GssTicket.Controllers
{
     [Route("api/[controller]")]
    public class DepartmentController :Controller
    {
        private IUnitOfwork<Departments> _UnitOfwork;
        public DepartmentController(IUnitOfwork<Departments> UnitOfwork )
        {
            _UnitOfwork = UnitOfwork;
        }
         [HttpGet("[action]")]
        public IActionResult GetDepartments()
        {
           
            var allDepartments = _UnitOfwork.entity.GetAll();
             return Ok(allDepartments);
            
           
            
        }

        [HttpGet("SingleDepartment/{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            var Department =  _UnitOfwork.entity.GetByID(id);
            return Ok(Department);
        }

        [HttpPost("AddDepartment")]
        public IActionResult AddDepartment([FromBody]Departments Department)
        {
            if(Department != null) 
            {
                 _UnitOfwork.entity.Insert(Department);
            }
            return Ok();
        }

        [HttpPut("UpdateDepartment/{id}")]
        public IActionResult UpdateDepartment(int id,[FromBody]Departments Department)
        {
            _UnitOfwork.entity.UpdateDepartments(id,Department);        
          return Ok(Department);

        }

        [HttpDelete("DeleteDepartment/{id}")]
        public IActionResult DeleteDepartment(int id)
        {
             _UnitOfwork.entity.Delete(id);
            return Ok();
        }
    }
}