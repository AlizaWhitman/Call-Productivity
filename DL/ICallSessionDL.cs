using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DL
{
    public interface ICallSessionDL
    {

        public bool deletePhoneNumber(string id);
        public bool deletDonor(string id);
    }
}
