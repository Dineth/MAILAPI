const sgMail = require('@sendgrid/mail');
import moment, { Moment } from 'moment-timezone';
import AppProps from './ApplicationProperties'

export default class MailUtil {
   
   
    public static async *generator(mail: any): AsyncIterableIterator<any> {
                              
        if (this.checkTimePeriod(mail.receivedTime))  { // Passing date to enhance untit etsting
            mail.status = AppProps.STAUS.PROCESS;
            yield mail;
        } else {
            mail.status = AppProps.STAUS.QUEUED;
            yield mail;
            return;
        } 

        yield await MailUtil.sendMailSendGrid(mail);

    }  
    
    // Get the current time in austrailia so we can host this in any server 
    public static checkTimePeriod(timeZonedDateTime :any) :boolean {
        let timeArray:string[] = AppProps.TIME_INTERVAL.split('-');
        
        let lowerTimeArray = timeArray[0].split(':');
        let uppertimeArray = timeArray[1].split(':');
        
       

        let timeLowerBound = moment(timeZonedDateTime);
        timeLowerBound.set('millisecond',0);
        timeLowerBound.set('second',0);
        timeLowerBound.set('minutes',parseInt(lowerTimeArray[1]));
        timeLowerBound.set('hours',parseInt(lowerTimeArray[0]));
        
        let timeUpperBound = moment(timeZonedDateTime);
        timeUpperBound.set('millisecond',0);
        timeUpperBound.set('second',0);
        timeUpperBound.set('minutes',parseInt(uppertimeArray[1]));
        timeUpperBound.set('hours', parseInt(uppertimeArray[0]));
        console.log(timeUpperBound);
        console.log(timeLowerBound);
        console.log(timeZonedDateTime);
        
        return (timeZonedDateTime >= timeLowerBound && timeZonedDateTime <= timeUpperBound);
        
    }
   
    public static async sendMailSendGrid(mail :any)  {
        sgMail.setApiKey(AppProps.MAIL_API_KEY);
        
        const msg = {
            to: mail.to,
            from: AppProps.FROM_MAIL,
            subject: mail.subject,
            text: mail.content
        };
        
        try {
            await sgMail.send(msg);
            mail.status = AppProps.STAUS.SENT;   
        } catch (err){
            mail.status = AppProps.STAUS.FAILED;
        }

        return mail;     
    }
}