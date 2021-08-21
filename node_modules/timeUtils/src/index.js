import { injectStringData, enforceLength } from './lib/utils.js';
import { dictionary, extendDictionary, resetDictionary } from './config.js';

var acceptedDateTokens = [
  { 
    // d: day of the month, 2 digits with leading zeros:
    key: 'd', 
    method: function(date) { return enforceLength(date.getDate(), 2); } 
  }, { 
    // D: textual representation of day, 3 letters: Sun thru Sat
    key: 'D', 
    method: function(date) { return dictionary.daysOfWeek[date.getDay()][1]; } 
  }, { 
    // j: day of month without leading 0's
    key: 'j', 
    method: function(date) { return date.getDate(); } 
  }, { 
    // l: full textual representation of day of week: Sunday thru Saturday
    key: 'l', 
    method: function(date) { return dictionary.daysOfWeek[date.getDay()][0]; } 
  }, { 
    // F: full text month: 'January' thru 'December'
    key: 'F', 
    method: function(date) { return dictionary.monthsOfYear[date.getMonth()][0]; } 
  }, { 
    // m: 2 digit numeric month: '01' - '12':
    key: 'm', 
    method: function(date) { return enforceLength(date.getMonth()+1,2); } 
  }, { 
    // M: a short textual representation of the month, 3 letters: 'Jan' - 'Dec'
    key: 'M', 
    method: function(date) { return dictionary.monthsOfYear[date.getMonth()][1]; } 
  }, { 
    // n: numeric represetation of month w/o leading 0's, '1' - '12':
    key: 'n', 
    method: function(date) { return date.getMonth() + 1; } 
  }, { 
    // Y: Full numeric year, 4 digits
    key: 'Y', 
    method: function(date) { return date.getFullYear(); } 
  }, { 
    // y: 2 digit numeric year:
    key: 'y', 
    method: function(date) { return enforceLength(date.getFullYear(),2,true); }
   }
];

var acceptedTimeTokens = [
  { 
    // a: lowercase ante meridiem and post meridiem 'am' or 'pm'
    key: 'a', 
    method: function(date) { return (date.getHours() > 11) ? 'pm' : 'am'; } 
  }, { 
    // A: uppercase ante merdiiem and post meridiem 'AM' or 'PM'
    key: 'A', 
    method: function(date) { return (date.getHours() > 11) ? 'PM' : 'AM'; } 
  }, { 
    // g: 12-hour format of an hour without leading zeros 1-12
    key: 'g', 
    method: function(date) { return date.getHours() % 12 || 12; } 
  }, { 
    // G: 24-hour format of an hour without leading zeros 0-23
    key: 'G', 
    method: function(date) { return date.getHours(); } 
  }, { 
    // h: 12-hour format of an hour with leading zeros 01-12
    key: 'h', 
    method: function(date) { return enforceLength(date.getHours()%12 || 12,2); } 
  }, { 
    // H: 24-hour format of an hour with leading zeros: 00-23
    key: 'H', 
    method: function(date) { return enforceLength(date.getHours(),2); } 
  }, { 
    // i: Minutes with leading zeros 00-59
    key: 'i', 
    method: function(date) { return enforceLength(date.getMinutes(),2); } 
  }, { 
    // s: Seconds with leading zeros 00-59
    key: 's', 
    method: function(date) { return enforceLength(date.getSeconds(),2); }
   }
];

/**
 * Internationalization object for timeUtils.internationalize().
 * @typedef internationalizeObj
 * @property {Array} [daysOfWeek=[ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]] daysOfWeek Weekday labels as strings, starting with Sunday.
 * @property {Array} [monthsOfYear=[ 'January','February','March','April','May','June','July','August','September','October','November','December' ]] monthsOfYear Month labels as strings, starting with January.
 */

/**
 * This function can be used to support additional languages by passing an object with 
 * `daysOfWeek` and `monthsOfYear` attributes.  Each attribute should be an array of
 * strings (ex: `daysOfWeek: ['monday', 'tuesday', 'wednesday'...]`)
 *
 * @param {internationalizeObj} conf
 */
export const internationalize = (conf={}) => { 
  extendDictionary(conf);
};

/**
 * generic formatDate function which accepts dynamic templates
 * @param date {Date} Required
 * @param template {String} Optional
 * @returns {String}
 *
 * @example
 * formatDate(new Date(), '#{M}. #{j}, #{Y}')
 * @returns {Number} Returns a formatted date
 *
 */
export const formatDate = (date,template='#{m}/#{d}/#{Y}') => {
  acceptedDateTokens.forEach(token => {
    if(template.indexOf(`#{${token.key}}`) == -1) return; 
    template = injectStringData(template,token.key,token.method(date))
  }); 
  acceptedTimeTokens.forEach(token => {
    if(template.indexOf(`#{${token.key}}`) == -1) return;
    template = injectStringData(template,token.key,token.method(date));
  });
  return template;
};

/**
 * Small function for resetting language to English (used in testing).
 */
export const resetInternationalization = () => resetDictionary();
