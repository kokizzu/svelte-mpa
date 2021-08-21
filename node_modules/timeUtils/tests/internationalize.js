import test from 'tape';
import { internationalize, formatDate } from '../dist/timeUtils.esm.js'; 
import formatterAssertions from './lib/formatterAssertions';

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


test('Date formatter w/ internationalization tests: ', (t) => {
  t.plan(formatterAssertions.length); 
  internationalize({
    daysOfWeek,
    monthsOfYear
  });
  formatterAssertions.forEach(assertion => { 
    let val = formatDate(assertion.date,assertion.format); 
    t.equal(val,assertion.formattedSpanish,`Expected ${val} to equal ${assertion.formattedSpanish}`);
  });
});
