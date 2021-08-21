/**
 * generic function to inject data into token-laden string
 * @param str {String} Required
 * @param name {String} Required
 * @param value {String|Integer} Required
 * @returns {String}
 *
 * @example
 * injectStringData("The following is a token: #{tokenName}", "tokenName", 123); 
 * @returns {String} "The following is a token: 123"
 *
 */
export const injectStringData = (str,name,value) => str
  .replace(new RegExp('#{'+name+'}','g'), value);

/**
 * Generic function to enforce length of string. 
 * 
 * Pass a string or number to this function and specify the desired length.
 * This function will either pad the # with leading 0's (if str.length < length)
 * or remove data from the end (@fromBack==false) or beginning (@fromBack==true)
 * of the string when str.length > length.
 *
 * When length == str.length or typeof length == 'undefined', this function
 * returns the original @str parameter.
 * 
 * @param str {String} Required
 * @param length {Integer} Required
 * @param fromBack {Boolean} Optional
 * @returns {String}
 *
 */
export const enforceLength = function(str,length,fromBack) {
  str = str.toString();
  if(typeof length == 'undefined') return str;
  if(str.length == length) return str;
  fromBack = (typeof fromBack == 'undefined') ? false : fromBack;
  if(str.length < length) {
    // pad the beginning of the string w/ enough 0's to reach desired length:
    while(length - str.length > 0) str = '0' + str;
  } else if(str.length > length) {
    if(fromBack) {
      // grab the desired #/chars from end of string: ex: '2015' -> '15'
      str = str.substring(str.length-length);
    } else {
      // grab the desired #/chars from beginning of string: ex: '2015' -> '20'
      str = str.substring(0,length);
    }
  }
  return str;
};