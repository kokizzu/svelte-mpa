const daysOfWeek = [ 
  [ 'Sunday', 'Sun' ],
  [ 'Monday', 'Mon' ],
  [ 'Tuesday', 'Tue' ],
  [ 'Wednesday', 'Wed' ],
  [ 'Thursday', 'Thu' ],
  [ 'Friday', 'Fri' ],
  [ 'Saturday', 'Sat' ]
];

const monthsOfYear = [ 
  [ 'January', 'Jan' ],
  [ 'February', 'Feb' ],
  [ 'March', 'Mar' ],
  [ 'April', 'Apr' ],
  [ 'May', 'May' ],
  [ 'June', 'Jun' ],
  [ 'July', 'Jul' ],
  [ 'August', 'Aug' ],
  [ 'September', 'Sep' ],
  [ 'October', 'Oct' ],
  [ 'November', 'Nov' ],
  [ 'December', 'Dec' ]
];

export let dictionary = { 
  daysOfWeek, 
  monthsOfYear
}

export const extendDictionary = (conf) => 
  Object.keys(conf).forEach(key => {
    if(dictionary[key] && dictionary[key].length == conf[key].length) {
      dictionary[key] = conf[key];
    }
  });

export const resetDictionary = () => extendDictionary({daysOfWeek,monthsOfYear});
