using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Util.Store;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace DL
{
    public class DataAccess
    {

        private readonly ILogger<DataAccess> _logger;
        public DataAccess(ILogger<DataAccess> logger)
        {
            _logger = logger;
        }
        static string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static string ApplicationName = "Google Sheets API .NET Quickstart";
        private string spreadsheetId = "19PmVscs-sEzUxKTZjQ1SJtIvJCvznG7yHGOIOohJARM";
        private string sheet;
        private SheetsService service;
        public string Sheet { get => sheet; set => sheet = value; }
        public string SpreadsheetId { get => spreadsheetId; }
        public SheetsService Service { get => service; set => service = value; }

        public void Connect()
        { 
            _logger.LogInformation("a connection is being made");
            try
            {
                UserCredential credential;
                using (var stream =
                    new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
                {
                    string credpath = "token.json";
                    credpath = Path.Combine(credpath, ".credentials/fund4yy");
                    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                        GoogleClientSecrets.Load(stream).Secrets,
                        Scopes,
                        "user",
                        CancellationToken.None,
                        new FileDataStore(credpath, true)).Result;
                }

                Service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = ApplicationName,
                });
            }
            catch (Exception e)
            {
                _logger.LogInformation($"this is the problem: {e.StackTrace.ToString()}");
                _logger.LogInformation("i can not connect to google sheets 😥");
            }

        }


    }
}