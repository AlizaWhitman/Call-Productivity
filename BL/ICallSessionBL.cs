using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL
{
    public interface ICallSessionBL
    {
        public bool deletePhoneNumber(string id);
        public bool deletDonor(string id);
    }
}
