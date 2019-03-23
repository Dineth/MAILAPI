import MailUtil from '../MailUtil';
import AppProps from '../ApplicationProperties'
import moment from 'moment-timezone';

test("Test time validation should return false for outside the time interval lowerbound", () =>{;
      var time = moment().tz(AppProps.TIME_ZONE);
      time.set('hour',3);
      const result = MailUtil.checkTimePeriod(time);
      expect(result).toBe(false);
});

test("Test time validation should return false for outside the time interval upper bound", () =>{;
    var time = moment().tz(AppProps.TIME_ZONE);
    time.set('hour', 19);
    const result = MailUtil.checkTimePeriod(time);
    expect(result).toBe(false);
});

test("Test time validation should return true for time inside the time interval ", () =>{;
    var time = moment().tz(AppProps.TIME_ZONE);
    time.set('hour', 10);
    const result = MailUtil.checkTimePeriod(time);
    expect(result).toBe(true);
});
   
