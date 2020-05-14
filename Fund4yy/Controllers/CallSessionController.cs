using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Fund4yy.Pages;

namespace Fund4yy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallSessionController : ControllerBase
    {
        int numOfDonors = 10;

        Program _Program;

        // Dependency Injection
        public CallSessionController(Program Program)
        {
            _Program = Program;
        }

        // GET: api/CallSession
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CallSession/5
        [HttpGet("{id}", Name = "Get")]
        public List<Donors> Get(string id)
        {
            return _Program.getFundraisersDonors(id);
        }

        // POST: api/CallSession
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/CallSession/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
