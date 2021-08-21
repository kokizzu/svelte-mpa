import test from 'tape';
import { resetInternationalization, formatDate } from '../dist/timeUtils.esm.js'; 
import formatterAssertions from './lib/formatterAssertions';


test('Date formatter tests: ', (t) => {
  resetInternationalization();
  t.plan(formatterAssertions.length); 
  formatterAssertions.forEach(assertion => { 
    let val = formatDate(assertion.date,assertion.format); 
    t.equal(val,assertion.formatted,`Expected ${val} to equal ${assertion.formatted}`);
  });
});