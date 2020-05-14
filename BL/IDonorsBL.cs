using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL
{
    public interface IDonorsBL
    {
        Boolean PostDonor(Donors Donor);
        List<DonorsList> GetAllDonors();
        
    }
}
