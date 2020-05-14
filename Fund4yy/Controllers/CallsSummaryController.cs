using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YY_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallsSummaryController : ControllerBase
    {
        ICallsSummaryBL _ICallsSummaryBL;
        // IWNAT TO SEE THIS BY MEEEEEEEEEE
        // Dependency Injection
        public CallsSummaryController(ICallsSummaryBL CallsSummaryBL)
        {
            _ICallsSummaryBL = CallsSummaryBL;
        }

        //// GET: api/CallsSummary
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/CallsSummary/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/CallsSummary
        [HttpPost]
        public void Post([FromBody] CallsSummary cs)
        {
            int justToSee = 9;
            _ICallsSummaryBL.PostCallsSummary(cs);
        }

        //// PUT: api/CallsSummary/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
