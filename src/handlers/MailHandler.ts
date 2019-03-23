import MailUtil from '../MailUtil'
 
export class MailHandler {       

    
    public static async sendMail(mail :any) {    
        
        var iterator = MailUtil.generator(mail);
        var step =await iterator.next(mail);
        
        // Run until processing is done
        while (!step.done && step.value.status==='PROCESS') {      
            step = await iterator.next();      
        }

        return step.value;
    }
}