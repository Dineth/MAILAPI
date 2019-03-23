import { MailHandler } from '../handlers/MailHandler';
import AppProps from '../ApplicationProperties'
import moment from 'moment-timezone';


let reqObj:any = {to:'dinethnsamarakkody@gmail.com',subject:'test',content:'test content'};

test("Test mail sent success", async () =>{;
    let reqObjtmp = Object.assign({},reqObj );
    let time = moment().tz(AppProps.TIME_ZONE);
    time.set('hour', 10);
    reqObjtmp.receivedTime = time;
    expect((await MailHandler.sendMail(reqObjtmp)).status).toBe(AppProps.STAUS.SENT);
});

test("Test mail sent queued", async () =>{;
    let reqObjtmp = Object.assign({},reqObj );
    let time = moment().tz(AppProps.TIME_ZONE);
    time.set('hour', 19);
    reqObjtmp.receivedTime = time;
    expect((await MailHandler.sendMail(reqObjtmp)).status).toBe(AppProps.STAUS.QUEUED);
});

