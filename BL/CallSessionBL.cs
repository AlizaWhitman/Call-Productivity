using DL;
using Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL
{
    public class CallSessionBL: ICallSessionBL
    {
        ICallSessionDL _CallSessionDL;
        public CallSessionBL(ICallSessionDL CallSessionDL)
        {
            _CallSessionDL = CallSessionDL;
        }

        public bool deletDonor(string id)
        {
           return this.deletDonor(id);
        }

        public bool deletePhoneNumber(string id)
        {
           return this._CallSessionDL.deletePhoneNumber(id);
        }

    }

}
