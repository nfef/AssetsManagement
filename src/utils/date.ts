import dayjs from "dayjs";
// dont remove the following import, it is implicitely used
import utc from "dayjs/plugin/utc"; 
import timezone from "dayjs/plugin/timezone";

interface dateFormatProp {
  date: Date;
  format: string;
  localize: boolean;
}

/**
 * This method is used to display a date acording to the timezone of the guess
 * 
 * @param {Date} date 
 * @param {String} format 
 * @param {boolean} localize 
 * @returns String
 */
export const  dateFormat = ({date, format, localize = true} : dateFormatProp) => {
  if (!localize) {
    return dayjs.utc(date).tz(dayjs.tz.guess()).format(format);
  }
  return dayjs.utc(date).local().tz(dayjs.tz.guess()).format(format);
};