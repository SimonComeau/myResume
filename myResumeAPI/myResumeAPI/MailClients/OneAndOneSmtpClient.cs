using System.Configuration;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;

namespace myResumeAPI.MailClients
{
    public class OneAndOneSmtpClient : SmtpClient
    {
        public OneAndOneSmtpClient()
        {
            Port = 587;
            EnableSsl = true;
            Host = "smtp.1and1.com";
            Credentials = GetNetworkCredential();
        }

        public NetworkCredential GetNetworkCredential()
        {
            var userName = ConfigurationManager.AppSettings.Get("SmtpUserName");
            var password = ConfigurationManager.AppSettings.Get("SmtpPassword");
            return new NetworkCredential(userName, password);
        }
    }
}