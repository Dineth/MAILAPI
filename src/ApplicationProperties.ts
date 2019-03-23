enum STATUS_ENUM {
    PROCESS = "PROCESS",
    QUEUED = "QUEUED",
    FAILED = "FAILED",
    SENT = "SENT"
}

export default class AppProps {
    public static PORT :number= 2010;
    public static DB_URL : string = 'mongodb://localhost/MailBase';
    public static MAIL_API_KEY = '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';
    public static TIME_INTERVAL = '8:00-17:00';
    public static FROM_MAIL = 'dinethsamarakkody@gmail.com';
    public static STAUS = STATUS_ENUM;
    public static TIME_ZONE ='Australia/Sydney';
}
