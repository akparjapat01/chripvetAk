import moment from 'moment-timezone';
import {getTimeZone} from 'react-native-localize';

const Timezone = getTimeZone();

export const DateTimeFormat = (value, twelve = true) => {
  // const currentUtcDatetime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const currentUtcDatetime = value;

  const indiaCurrentTime = moment
    .utc(currentUtcDatetime)
    .tz(Timezone)
    .format('YYYY-MM-DD HH:mm:ss');
  // const timezones = moment.tz.names();
  const timezone = Timezone; // Example target timezone

  const convertedDatetime = moment
    .utc(currentUtcDatetime)
    .tz(timezone)
    .format('YYYY-MM-DD HH:mm:ss');

  // console.log(convertedDatetime, ", ", value); // Output: 2023-06-08 06:30:00

  let AM_PM;

  if (twelve) {
    let hours = convertedDatetime?.split(' ')?.[1]?.slice(0, 2);
    hours = parseInt(hours);
    // console.log("HOURS", hours, typeof(hours))
    AM_PM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours =
      (hours > 9 ? hours.toString() : +'0' + hours.toString()) +
      convertedDatetime?.split(' ')?.[1]?.slice(2, 5) +
      AM_PM;
    return hours;
  }

  return convertedDatetime?.split(' ')?.[1]?.slice(0, 5);
};

export const DateFormat = value => {
  // const currentUtcDatetime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const currentUtcDatetime = value;

  // const indiaCurrentTime = moment
  //   .utc(currentUtcDatetime)
  //   .tz(Timezone)
  //   .format('YYYY-MM-DD');
  // const timezones = moment.tz.names();
  const timezone = Timezone; // Example target timezone

  const convertedDatetime = moment
    .utc(currentUtcDatetime)
    .tz(timezone)
    .format('YYYY-MM-DD');

  return convertedDatetime;
};

export const DateTimeFormat_Both = value => {
  // const currentUtcDatetime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const currentUtcDatetime = value;

  const indiaCurrentTime = moment
    .utc(currentUtcDatetime)
    .tz(Timezone)
    .format('YYYY-MM-DD HH:mm:ss');
  // const timezones = moment.tz.names();
  const timezone = Timezone; // Example target timezone

  // const convertedDatetime = moment
  //   .utc(currentUtcDatetime)
  //   .tz(timezone)
  //   .format('YYYY-MM-DD HH:mm:ss');

  const convertedDatetime = moment
    .utc(currentUtcDatetime)
    .tz(timezone)
    .format('YYYY-MM-DD HH:mm:ss');

  return convertedDatetime;
};
