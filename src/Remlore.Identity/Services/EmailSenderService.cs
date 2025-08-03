using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using Remlore.Identity.Models;
using System.Net;
using System.Net.Mail;

namespace Remlore.Identity.Services
{
    public class EmailSenderService(IOptions<SendMailSettings> _sendMailSettings) : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var smtpClient = new SmtpClient
            {
                Host = _sendMailSettings.Value.Host,
                Port = _sendMailSettings.Value.Port,
                EnableSsl = _sendMailSettings.Value.EnableSsl,
                Credentials = new NetworkCredential(
                    _sendMailSettings.Value.UserName,
                    _sendMailSettings.Value.Password)
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_sendMailSettings.Value.UserName),
                Subject = subject,
                Body = htmlMessage,
                IsBodyHtml = true
            };

            //try {
            //    smtpClient.Connect (mailSettings.Host, mailSettings.Port, SecureSocketOptions.StartTls);
            //    smtpClient.Authenticate (mailSettings.Mail, mailSettings.Password);
            //    await smtpClient.SendAsync (mailMessage);
            //} catch (Exception ex) {
            //    // Gửi mail thất bại, nội dung email sẽ lưu vào thư mục mailssave
            //    System.IO.Directory.CreateDirectory ("mailssave");
            //    var emailsavefile = string.Format (@"mailssave/{0}.eml", Guid.NewGuid ());
            //    await mailMessage.WriteToAsync (emailsavefile);

            //    logger.LogInformation ("Lỗi gửi mail, lưu tại - " + emailsavefile);
            //    logger.LogError (ex.Message);
            //}
            mailMessage.To.Add(email);

            return smtpClient.SendMailAsync(mailMessage);
        }
    }
}
