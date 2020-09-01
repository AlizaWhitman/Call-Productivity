using Entities;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace DL
{
    public class MembersDL : IMembersDL
    {

        private readonly ILogger<MembersDL> _logger;

        DataAccess _Connection;

        public MembersDL(DataAccess Connection, ILogger<MembersDL> logger)
        {
            _logger = logger;
            _Connection = Connection;
            _Connection.Sheet = "Fundraisers";
            _Connection.Connect();
        }

        public Members GetMember(string Email, string Password)
        {
            _Connection.Sheet = "Fundraisers";
            _logger.LogInformation($"GOT TO GETMEMBER AT DL FOR {Email}");
            var range = $"{_Connection.Sheet}!A:AP";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                _Connection.Service.Spreadsheets.Values.Get(_Connection.SpreadsheetId, range);
            var response = request.Execute();
            IList<IList<object>> values = response.Values;
            if (values != null && values.Count > 0)
            {
                foreach (var row in values)
                {
                    if (row.Count != 0)
                    {
                        Members CurrentMember = new Members();
                        if (row.Count > 8)
                        {
                            if (row[8].ToString().ToLower() == Email.ToLower())
                            {
                                if (row[2].ToString() == Password)
                                {

                                    CurrentMember.ID = row[0].ToString();
                                    CurrentMember.FullName = row[1].ToString();
                                    CurrentMember.Password = row[2].ToString();
                                    CurrentMember.FirstName = row[3].ToString();
                                    CurrentMember.LastName = row[4].ToString();
                                    CurrentMember.Confirmed = bool.Parse(row[5].ToString());
                                    CurrentMember.Gender = row[6].ToString();
                                    CurrentMember.AgeGroup = row[7].ToString();
                                    CurrentMember.Email = row[8].ToString();
                                    CurrentMember.PhoneNumber = row[9].ToString();
                                    CurrentMember.Country = row[10].ToString();
                                    CurrentMember.City = row[11].ToString();
                                    CurrentMember.TotalDonations = int.Parse(row[12].ToString());
                                    CurrentMember.TotalCallsMade = int.Parse(row[13].ToString());
                                    CurrentMember.FluentHebrew = bool.Parse(row[14].ToString());
                                    CurrentMember.FluentRussian = bool.Parse(row[15].ToString());
                                    CurrentMember.FluentEnglish = bool.Parse(row[16].ToString());
                                    CurrentMember.AnashIsrael = bool.Parse(row[17].ToString());
                                    CurrentMember.AnashUSA = bool.Parse(row[18].ToString());
                                    CurrentMember.PinskSchoolGraduate = bool.Parse(row[19].ToString());
                                    CurrentMember.KievSchoolGraduate = bool.Parse(row[20].ToString());
                                    CurrentMember.YeshivaGraduate = bool.Parse(row[21].ToString());
                                    CurrentMember.InPinsk = bool.Parse(row[22].ToString());
                                    CurrentMember.BusinessAssociate = bool.Parse(row[23].ToString());
                                    CurrentMember.BoysCounselor = bool.Parse(row[24].ToString());
                                    CurrentMember.GirlsCounselor = bool.Parse(row[25].ToString());
                                    CurrentMember.HelpedByPinsk = bool.Parse(row[26].ToString());
                                    CurrentMember.GeneralSupporter = bool.Parse(row[27].ToString());
                                    CurrentMember.MHSG = bool.Parse(row[28].ToString());
                                    CurrentMember.BelarusAnsectors = bool.Parse(row[29].ToString());
                                    CurrentMember.BelarusTourism = bool.Parse(row[30].ToString());
                                    CurrentMember.YYFundraiser = bool.Parse(row[31].ToString());
                                    CurrentMember.YYFamily = bool.Parse(row[32].ToString());
                                    CurrentMember.YYStaff = bool.Parse(row[33].ToString());
                                    CurrentMember.RShteiermanFamily = bool.Parse(row[34].ToString());
                                    CurrentMember.RFimaFamily = bool.Parse(row[35].ToString());
                                    CurrentMember.MarriedAYYGraduate = bool.Parse(row[36].ToString());
                                    CurrentMember.YearsInYadYisroel = Int32.Parse(row[37].ToString());
                                    CurrentMember.YearsInYadYisroel = Int32.Parse(row[38].ToString());
                                    _logger.LogInformation($"FOUND MEMBER AND IS ABOUT TO RETURN FROM DL");
                                    return CurrentMember;
                                }
                            }
                        }
                    }
                }
                return null;
            }
            return null;
        }
        public Members PostMember(Members Member)
        {
            _Connection.Sheet = "Fundraisers";
            var range = $"{_Connection.Sheet}!A:AP";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                _Connection.Service.Spreadsheets.Values.Get(_Connection.SpreadsheetId, range);
            var response = request.Execute();
            Member.ID = response.Values.Count.ToString();
            var valueRange = new ValueRange();
            //Member.Password = Member.ID + Member.FirstName;
            Member.Password = "1";
            var oblist = new List<object>() { Member.ID,
                                              Member.FullName,
                                              Member.Password,
                Member.FirstName, Member.LastName, Member.Confirmed, Member.Gender, Member.AgeGroup, Member.Email, Member.PhoneNumber,
                Member.Country, Member.City, Member.TotalDonations, Member.TotalCallsMade, Member.FluentHebrew,Member.FluentRussian,
                Member.FluentEnglish, Member.AnashIsrael, Member.AnashUSA,
                Member.PinskSchoolGraduate, Member.KievSchoolGraduate,
                Member.YeshivaGraduate, Member.InPinsk,Member.BusinessAssociate, Member.BoysCounselor ,Member.GirlsCounselor, Member.HelpedByPinsk, Member.GeneralSupporter,Member.MHSG, Member.BelarusAnsectors, Member.BelarusTourism, Member.YYFundraiser, Member.YYFamily, Member.YYStaff, Member.RShteiermanFamily, Member.RFimaFamily, Member.MarriedAYYGraduate, Member.YearsInYadYisroel, Member.YearsIAsFundraiser,Member.OperationRoom, Member.Other };
            valueRange.Values = new List<IList<object>> { oblist };
            var appendRequest = _Connection.Service.Spreadsheets.Values.Append(valueRange, _Connection.SpreadsheetId, range);
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendReponse = appendRequest.Execute();
            return Member;
        }
        public Boolean PutMember(Members Member)
        {
            _Connection.Sheet = "Fundraisers";
            var rangeToUpdate = $"{_Connection.Sheet}!A" + (int.Parse(Member.ID) + 1).ToString();
            var valueRange = new ValueRange();
            // Setting Cell Value...
            var oblist = new List<object>() {Member.ID,
                                              Member.FullName,
                                              Member.Password,
                Member.FirstName, Member.LastName, Member.Confirmed, Member.Gender, Member.AgeGroup, Member.Email, Member.PhoneNumber,
                Member.Country, Member.City, Member.TotalDonations,Member.TotalCallsMade, Member.FluentHebrew,Member.FluentRussian,
                Member.FluentEnglish, Member.AnashIsrael, Member.AnashUSA,
                Member.PinskSchoolGraduate, Member.KievSchoolGraduate,
                Member.YeshivaGraduate, Member.InPinsk,Member.BusinessAssociate, Member.BoysCounselor ,Member.GirlsCounselor, Member.HelpedByPinsk, Member.GeneralSupporter,Member.MHSG, Member.BelarusAnsectors, Member.BelarusTourism, Member.YYFundraiser, Member.YYFamily, Member.YYStaff, Member.RShteiermanFamily, Member.RFimaFamily, Member.MarriedAYYGraduate, Member.YearsInYadYisroel, Member.YearsIAsFundraiser,Member.OperationRoom, Member.Other};
            valueRange.Values = new List<IList<object>> { oblist };
            var updateRequest = _Connection.Service.Spreadsheets.Values.Update(valueRange, _Connection.SpreadsheetId, rangeToUpdate);
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.USERENTERED;
            var appendReponse = updateRequest.Execute();
            return true;
        }
        public Boolean DeleteMember(int ID)
        {
            _Connection.Sheet = "Fundraisers";
            var range = $"{_Connection.Sheet}!A" + ID.ToString() + ":AP" + ID.ToString();
            var valueRange = new ClearValuesRequest();
            valueRange.Equals(range);
            var clearRequest = _Connection.Service.Spreadsheets.Values.Clear(valueRange, _Connection.SpreadsheetId, range);
            var appendReponse = clearRequest.Execute();
            return true;
        }
        public ConfirmationCode SendPassword(string Email, SendPassword Source)
        {
            _Connection.Sheet = "Fundraisers";
            string to = Email;
            string from = "fundraisingforyadyisroel@gmail.com"; //From address
            ConfirmationCode cd = new ConfirmationCode();
            try
            {
                MailMessage message = new MailMessage(from, to);
                message.BodyEncoding = Encoding.UTF8;
                message.IsBodyHtml = true; string mailbody;
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp    
                System.Net.NetworkCredential basicCredential1 = new
                System.Net.NetworkCredential("fundraisingforyadyisroel@gmail.com", "fundraising!1");
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = basicCredential1;
                switch (Source)
                {
                    case Entities.SendPassword.ForgotPassword:
                        var range = $"{_Connection.Sheet}!A:AP";
                        SpreadsheetsResource.ValuesResource.GetRequest request =
                            _Connection.Service.Spreadsheets.Values.Get(_Connection.SpreadsheetId, range);
                        var response = request.Execute();
                        IList<IList<object>> values = response.Values;
                        if (values != null && values.Count > 0)
                        {
                            foreach (var row in values)
                            {
                                if (row.Count != 0)
                                {
                                    if (row[8].ToString().ToLower() == Email.ToLower())
                                    {
                                        mailbody = "Your password is: " + row[2].ToString();
                                        message.Subject = "Your Password";
                                        message.Body = mailbody;
                                        try
                                        {
                                            client.Send(message);
                                            cd.EmailStatus = Status.EmailSent;
                                            return cd;
                                        }
                                        catch
                                        {
                                            cd.EmailStatus = Status.ProblemSending;
                                            return cd;
                                        }
                                    }
                                }
                            }
                        }
                        cd.EmailStatus = Status.EmailNotFound;
                        return cd;
                    case Entities.SendPassword.NewMember:
                        //חיפוש למצוא את המייל אם הוא כן כבר קיים
                        Random rnd = new Random();
                        int length = 10;
                        string rndPassword = "";
                        for (var i = 0; i < length; i++)
                        {
                            rndPassword += ((char)(rnd.Next(1, 26) + 64)).ToString();
                        }
                        mailbody = "Your Confirmation Code is: " + rndPassword;
                        message.Subject = "Confirmation Code";
                        message.Body = mailbody;
                        try
                        {
                            client.Send(message);
                            cd.EmailStatus = Status.EmailSent;
                            cd.Code = rndPassword;
                            return cd;
                        }
                        catch
                        {
                            cd.EmailStatus = Status.ProblemSending;
                            return cd;
                        }
                    default:
                        return null;
                }
            }
            catch
            {
                cd.EmailStatus = Status.IncorrectFormat;
                return cd;
            }
            
            
        }

        
    }
}