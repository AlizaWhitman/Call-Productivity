using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BL;
using Entities;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace YY_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly ILogger<MembersController> _logger;

        // Declaring instance
        IMembersBL _IMemberBL;

        // Dependency Injection
        public MembersController(IMembersBL MemberBL, ILogger<MembersController> logger)
        {
            _IMemberBL = MemberBL;
            _logger = logger;
        }

            //[HttpGet("[action]{Member}")]
        [Route("[action]")]
        public Members LogIn([FromBody] Members Member)
        {
            _logger.LogInformation($"LOG IN: { Member.Email} PASSWORD: {Member.Password}");
            return _IMemberBL.GetMember(Member.Email, Member.Password);
        }

       
       
        [HttpGet("[action]{Email}/{Source}")]
        public ConfirmationCode GetPassword(string Email, SendPassword Source)
        {
            return _IMemberBL.SendPassword(Email, Source);
        }

        // POST: api/My
        [HttpPost]
        public Members Post([FromBody] Members Member)
        {
            return _IMemberBL.PostMember(Member);
        }

        //PUT: api/My/5
        [HttpPut("{Id}")]
        public Boolean Put(int Id, [FromBody] Members MemberToUpdate)
        {
            return _IMemberBL.PutMember(MemberToUpdate);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{ID}")]
        public void Delete(int ID)
        {
            _IMemberBL.DeleteMember(ID);
        }
    }
}
