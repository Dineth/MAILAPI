import * as mongoose from 'mongoose';
import { MailSchema } from '../models/Mail';
import {MailHandler} from '../handlers/MailHandler';
import { Request, Response } from 'express';
import AppProps from '../ApplicationProperties'
import moment, { Moment } from 'moment-timezone';


const Mail = mongoose.model('Mail', MailSchema);
export class MailController {

    public async sendMail (req: Request, res: Response) {   
           
        let mail = new Mail(req.body);
        req.body.receivedTime = moment().tz(AppProps.TIME_ZONE);
        let mailObj = await MailHandler.sendMail(req.body);

        mail.set ('status', mailObj.status);

        mail.save((err, mail) => {
            
            if (err) {
                res.send(err);
            } else {
                res.json({ id: mail.get('_id'), status: mail.get('status')});
            }
        
        });

    }

    public getMail (req: Request, res: Response) {   
        
        Mail.findById(req.params.id, (err, mail) => {
        
            if (err) {
                res.send(err);
            } else if(mail !== null) {
                res.json({ id: mail.get('_id'), status: mail.get('status')});
            } else {
                res.send('Not found');
            }
        
        });
    }

    public deleteMail (req: Request, res: Response) {   
       
        Mail.deleteOne({ _id: req.params.id }, (err :any) => {
            
            if(err){
                res.send(err);
            } else {
                res.json({ id: req.params.id , status:'DELETED'});
            }
        
        });
    }     
    

}