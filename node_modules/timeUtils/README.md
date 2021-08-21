[![Build Status](https://travis-ci.com/6eDesign/timeUtils.svg?branch=master)](https://travis-ci.com/6eDesign/timeUtils)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![npm version](https://badge.fury.io/js/timeUtils.svg)](https://badge.fury.io/js/timeUtils)

# timeUtils.js
Simple time/date formatter for JavaScript which uses PHP-like syntax to easily format JavaScript date objects into legible/formatted strings.  It works in the browser and Node.js and is quite small ~1.3KB (minified & gzipped). 

## Installation & Including the Script:

First, install the module via NPM: 

```npm i timeUtils```[<sup>1</sup>](#1)

Then include the module...

As an import: 

```javascript
import { formatDate } from 'timeUtils'
```

As a Common JS library: 
```javascript
const formatDate = require('timeUtils').formatDate; 
```

As a script tag: 
```html
<script type="text/javascript" src="node_modules/timeUtils/dist/timeUtils.umd.js" />
```

## Usage:

timeUtils's `formatDate` function expects a JavaScript Date object as its first argument and a string-based template as its second argument.  

The templates should take the following form: 
`"Lorem Ipsum '#{m}/#{d}/#{Y}'"`

Where strings wrapped in `#{}` represent date/time variables which  will be formatted for you.  The  table below shows all the variables currently available along with a brief description.  In the above example template, we would get date in the "mm/dd/yyyy" format - for example.

### Date Variables
| Symbol/Token  | Type | Description | Example(s) |
| ------------- | ------------- | ------------- | ------------- |
| D | day of week | Textual representation of day of week, 3 letters | Sun, Mon, ... Sat |
| l | day of week | Full textual representation of day of week | Sunday, Monday, ... Saturday |
| F | month | Full textual representation of the month | January, ... December |
| M | month | Abbreviated textual representation of month, 3 letters | Jan, Feb, ... Dec |
| n | month | Numeric representation of month without leading 0's | 1, 2, ... 12 |
| m | month | Numeric representation of the month with leading 0's | 01, 02, ... 12 |
| j | day of month | Day of month, without leading 0's | 1, 2, ... 31 |
| d | day of month | Day of the month, 2 digits, with leading zeros | 01, 02, ... 31 |
| y | year | Short numeric year, 2 digits | 00, 01, ... 15 |
| Y | year | Full numeric year, 4 digits | 2000, 2001, ... 2015 |

### Time Variables
Symbol/Token  | Type | Description | Example(s)
------------- | ------------- | ------------- | -------------
| g | hour | 12-hour format of the hour, without leading 0's | 1, 2, ... 12 |
| h | hour | 12-hour format of the hour, with leading 0's | 01, 02, ... 12 |
| G | hour | 24-hour format of the hour, without leading 0's | 0, 1, ... 23 |
| H | hour | 24-hour format of the hour, with leading 0's | 00, 01, ... 23 |
| i | minute | Minutes with leading 0's | 00, 01, ... 59 |
| s | seconds | Seconds with leading 0's | 00, 01, ... 59 |
| a | am/pm | Lowercase ante meridiem and post meridiem | 'am' or 'pm' |
| A | am/pm | Uppercase ante meridiem and post meridiem | 'AM' or 'PM' |

### Internationalization: 
timeUtils provides an `internationalize` method which can be used to support multiple languages: 

```javascript
import { internationalize } from 'timeUtils';
const daysOfWeek = [
  [ 'Domingo', 'Dom' ],
  [ 'Lunes', 'Lun' ],
  [ 'Martes', 'Mar' ],
  [ 'Miércoles', 'Mié' ],
  [ 'Jueves', 'Jue' ],
  [ 'Viernes', 'Vie' ],
  [ 'Sábado', 'Sáb' ],
];
const monthsOfYear = [
  [ 'Enero', 'Ene' ],
  [ 'Febrero', 'Feb' ],
  [ 'Marzo', 'Mar' ],
  [ 'Abril', 'Abr' ],
  [ 'Mayo', 'May' ],
  [ 'Junio', 'Jun' ],
  [ 'Julio', 'Jul' ],
  [ 'Agosto', 'Ago' ],
  [ 'Septiembre', 'Sep' ],
  [ 'Octubre', 'Oct' ],
  [ 'Noviembre', 'Nov' ],
  [ 'Diciembre', 'Dic' ],
];
internationalize({ daysOfWeek, monthsOfYear });
```

### Examples
```javascript 
var date = new Date()
```

> Mon Apr 06 2015 21:51:08 GMT-0600 (Mountain Daylight Time)

```javascript
timeUtils.formatDate(date,'Your appointment is on #{l}, #{F} #{j}, #{Y} at #{g}:#{i} #{A}.')
```

> "Your appointment is on Monday, April 6, 2015 at 9:48 PM."

<a class="anchor" id="1"></a><sup>1</sup> add --save if you are using npm < 5.0.0
