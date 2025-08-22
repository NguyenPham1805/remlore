namespace Remlore.Identity.Models
{

    public class SendMailSettings
    {
        public const string Section = "SendMail";

        public required string Host { get; set; }
        public int Port { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public bool EnableSsl { get; set; }
    }
}