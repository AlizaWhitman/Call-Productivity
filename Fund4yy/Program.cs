using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DL;
using Entities;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;

namespace Fund4yy
{
    public class Program
    {

        
        static DataAccess _Connection;
        static int numOfCallsPerHour = 10;
        static int hoursOfDonating = 24;
        static public Dictionary<string, List<Donors>> fundraisersConnection =
        new Dictionary<string, List<Donors>>();
        public List<Donors> getFundraisersDonors(string Id)
        {
            List<Donors> listOfDonors;
            fundraisersConnection.TryGetValue(Id, out listOfDonors);
            if (listOfDonors.Count < numOfCallsPerHour)
                return listOfDonors;
           return listOfDonors.GetRange(0, numOfCallsPerHour);
        }
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var serviceScope = host.Services.CreateScope())
            {
                var services = serviceScope.ServiceProvider;
                try
                {
                    var _Connection = services.GetRequiredService<DataAccess>();
                    _Connection.Sheet = "Donors";
                    _Connection.Connect();
                    var range = $"{_Connection.Sheet}!A2:AL";
                    SpreadsheetsResource.ValuesResource.GetRequest request =
                        _Connection.Service.Spreadsheets.Values.Get(_Connection.SpreadsheetId, range);
                    var response = request.Execute();
                    IList<IList<object>> values = response.Values;
                    List<DonorsList> AllDonors = new List<DonorsList>();
                    if (values != null && values.Count > 0)
                    {
                        foreach (var row in values)
                        {
                            if (row.Count != 0)
                            {
                                Donors CurrentDonor = new Donors();
                                CurrentDonor.ID = row[0].ToString();
                                CurrentDonor.FullName = row[1].ToString();
                                CurrentDonor.FirstName = row[2].ToString();
                                CurrentDonor.LastName = row[3].ToString();
                                CurrentDonor.ConnectionID = null;
                                CurrentDonor.Gender = row[5].ToString();
                                CurrentDonor.AgeGroup = row[6].ToString();
                                CurrentDonor.Email = null;
                                CurrentDonor.PhoneNumber = row[8].ToString();
                                CurrentDonor.Country = row[9].ToString();
                                CurrentDonor.City = row[10].ToString();
                                CurrentDonor.NativeLanguage = row[11].ToString();
                                CurrentDonor.TotalDonation = int.Parse(row[12].ToString()); ;
                                CurrentDonor.LastDonation = int.Parse(row[13].ToString());
                                CurrentDonor.VIP = bool.Parse(row[14].ToString());
                                CurrentDonor.AnashIsrael = bool.Parse(row[15].ToString());
                                CurrentDonor.AnashUSA = bool.Parse(row[16].ToString());
                                CurrentDonor.PinskSchoolGraduate = bool.Parse(row[17].ToString());
                                CurrentDonor.KievSchoolGraduate = bool.Parse(row[18].ToString());
                                CurrentDonor.YeshivaGraduate = bool.Parse(row[19].ToString());
                                CurrentDonor.InPinsk = bool.Parse(row[20].ToString());
                                CurrentDonor.BusinessAssociate = bool.Parse(row[21].ToString());
                                CurrentDonor.BoysCounselor = bool.Parse(row[22].ToString());
                                CurrentDonor.GirlsCounselor = bool.Parse(row[23].ToString());
                                CurrentDonor.HelpedByPinsk = bool.Parse(row[24].ToString());
                                CurrentDonor.GeneralSupporter = bool.Parse(row[25].ToString());
                                CurrentDonor.MHSG = bool.Parse(row[26].ToString());
                                CurrentDonor.BelarusAnsectors = bool.Parse(row[27].ToString());
                                CurrentDonor.BelarusTourism = bool.Parse(row[28].ToString());
                                CurrentDonor.YYFundraiser = bool.Parse(row[29].ToString());
                                CurrentDonor.YYFamily = bool.Parse(row[30].ToString());
                                CurrentDonor.YYStaff = bool.Parse(row[31].ToString());
                                CurrentDonor.RShteiermanFamily = bool.Parse(row[32].ToString());
                                CurrentDonor.RFimaFamily = bool.Parse(row[33].ToString());
                                CurrentDonor.MarriedAYYGraduate = bool.Parse(row[34].ToString());
                                CurrentDonor.YearsInYadYisroel = Int32.Parse(row[35].ToString());
                                List<Donors> CurrentDonorsConnectionsList;
                                fundraisersConnection.TryGetValue(row[4].ToString(), out CurrentDonorsConnectionsList);
                                if (CurrentDonorsConnectionsList == null)
                                {
                                    CurrentDonorsConnectionsList = new List<Donors>();
                                    fundraisersConnection.Add(row[4].ToString(), CurrentDonorsConnectionsList);
                                }
                                CurrentDonorsConnectionsList.Add(CurrentDonor);
                            };
                        }
                    }
                    foreach (var fundraiser in fundraisersConnection)
                    {
                        List<Donors> sortedList;
                        fundraisersConnection.Remove(fundraiser.Key, out sortedList);
                        sortedList = fundraiser.Value.OrderBy(donor => donor.TotalDonation).ToList();
                        fundraisersConnection.Add(fundraiser.Key, sortedList);  
                    }
                    foreach (List<Donors> listOFDonors in fundraisersConnection.Values)
                    {
                        if(listOFDonors.Count > numOfCallsPerHour * hoursOfDonating)
                        {
                            List<Donors> donorsAvailable;
                            donorsAvailable = listOFDonors.GetRange(numOfCallsPerHour * hoursOfDonating, listOFDonors.Count);
                            foreach (Donors donor in donorsAvailable)
                            {
                                var rangeToUpdate = $"{_Connection.Sheet}!AL" + (int.Parse(donor.ID) + 1).ToString();
                                ValueRange valueRange = new ValueRange();
                                var oblist = new List<object>() { "True" };
                                valueRange.Values = new List<IList<object>> { oblist };
                                SpreadsheetsResource.ValuesResource.UpdateRequest update = _Connection.Service.Spreadsheets.Values.Update(valueRange, _Connection.Sheet, rangeToUpdate);
                                update.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;
                                UpdateValuesResponse result2 = update.Execute();
                            }

                        }
                    }
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred.");
                }
            }
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {

                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseNLog();
                });
    }
}
