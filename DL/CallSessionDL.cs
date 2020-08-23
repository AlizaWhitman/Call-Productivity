using Entities;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace DL
{
    public class CallSessionDL:ICallSessionDL
    {
        DataAccess _Connection;

        public CallSessionDL(DataAccess Connection)
        {
            _Connection = Connection;
            _Connection.Sheet = "Donors";
            _Connection.Connect();
        }

        public bool deletDonor(string id)
        {
            var range = $"{_Connection.Sheet}!A" + (int.Parse(id) + 1).ToString() + ":AL" + (int.Parse(id) + 1).ToString();
            var valueRange = new ClearValuesRequest();
            valueRange.Equals(range);
            var clearRequest = _Connection.Service.Spreadsheets.Values.Clear(valueRange, _Connection.SpreadsheetId, range);
            var appendReponse = clearRequest.Execute();
            return true;
        }

        public bool deletePhoneNumber(string id)
        {
            var rangeToUpdate = $"{_Connection.Sheet}!I" + (int.Parse(id) + 1).ToString();
            ValueRange valueRange = new ValueRange();
            var oblist = new List<object>() { "NULL" };
            valueRange.Values = new List<IList<object>> { oblist };
            var updateRequest = _Connection.Service.Spreadsheets.Values.Update(valueRange, _Connection.SpreadsheetId, rangeToUpdate);
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;
            var appendReponse = updateRequest.Execute();
            return true;
        }
    }
}
