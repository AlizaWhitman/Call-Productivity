using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Fund4yy.Pages;
using BL;

namespace Fund4yy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallSessionController : ControllerBase
    {
        int numOfDonors = 10;

        Program _Program;
        ICallSessionBL _CallSessionBL;

        // Dependency Injection
        public CallSessionController(Program Program, ICallSessionBL CallSessionBL)
        {
            _Program = Program;
            _CallSessionBL = CallSessionBL;
        }

        // GET: api/CallSession
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CallSession
        [HttpGet("{name}")]
        public List<Donors> Get(string name)
        {
            return _Program.getFundraisersDonors(name);
        }
        //PUT: api/CallSession/5
        //[HttpPut()]
        [HttpPut("{member}/{donor}")]
        public bool PutDonor(string member, int donor)
        {
            return _Program.removeDonorToEnd(donor, member);
        }

        // PUT: api/CallSession/5
        [HttpPut("{id}")]
        public bool Put(int i, string id)
        {
            return _CallSessionBL.deletePhoneNumber(id);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
           return this._CallSessionBL.deletDonor(id);
        }
    }
}
