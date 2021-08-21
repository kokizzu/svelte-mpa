let date1 = new Date(2018,8,29,9,30,0,0);
let date2 = new Date(2018,11,3,16,30,0,0);
let date3 = new Date(2018,11,3,0,0,0,0);

export default [ 
  { 
    date: date1,
    format: '#{D} #{M} #{d}, #{Y}', 
    formatted: 'Sat Sep 29, 2018', 
    formattedSpanish: 'Sáb Sep 29, 2018'
  }, { 
    date: date1,
    format: '#{l} #{F} #{d}, #{y}', 
    formatted: 'Saturday September 29, 18' , 
    formattedSpanish: 'Sábado Septiembre 29, 18' 
  }, { 
    date: date2, 
    format: '#{l} #{F} #{d}, #{Y}', 
    formatted: 'Monday December 03, 2018', 
    formattedSpanish: 'Lunes Diciembre 03, 2018'
  }, { 
    date: date2, 
    format: '#{l} #{F} #{j}, #{Y}',
    formatted: 'Monday December 3, 2018', 
    formattedSpanish: 'Lunes Diciembre 3, 2018'
  }, { 
    date: date1, 
    format: '#{m}/#{d}/#{Y}',
    formatted: '09/29/2018', 
    formattedSpanish: '09/29/2018'
  }, { 
    date: date1, 
    format: '#{n}/#{d}/#{Y}',
    formatted: '9/29/2018', 
    formattedSpanish: '9/29/2018'
  }, { 
    date: date1, 
    format: '#{g}:#{i}:#{s} #{a}',
    formatted: '9:30:00 am', 
    formattedSpanish: '9:30:00 am'
  }, { 
    date: date1, 
    format: '#{G}:#{i}:#{s} #{a}',
    formatted: '9:30:00 am', 
    formattedSpanish: '9:30:00 am'
  }, { 
    date: date1, 
    format: '#{h}:#{i}:#{s} #{a}',
    formatted: '09:30:00 am', 
    formattedSpanish: '09:30:00 am'
  }, { 
    date: date1, 
    format: '#{H}:#{i}:#{s} #{a}',
    formatted: '09:30:00 am', 
    formattedSpanish: '09:30:00 am'
  }, { 
    date: date2, 
    format: '#{g}:#{i}:#{s} #{a}',
    formatted: '4:30:00 pm', 
    formattedSpanish: '4:30:00 pm'
  }, { 
    date: date2, 
    format: '#{G}:#{i}:#{s} #{a}',
    formatted: '16:30:00 pm', 
    formattedSpanish: '16:30:00 pm'
  }, { 
    date: date3, 
    format: '#{G}:#{i}:#{s} #{a}',
    formatted: '0:00:00 am', 
    formattedSpanish: '0:00:00 am'
  }, { 
    date: date3, 
    format: '#{H}:#{i}:#{s} #{a}',
    formatted: '00:00:00 am', 
    formattedSpanish: '00:00:00 am'
  }
];