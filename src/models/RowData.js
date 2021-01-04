import {tashkeelOrder} from './Globals';

function random_rgba(id) {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + (r()+id).toFixed(1) + ')';
}

export default function RowData(id, souraName, aya, system, char, count, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12 ) {
  let obj = { id: id,
           color: random_rgba(id),
           souraName: souraName,
           aya: aya,
           system: system,
           char: char,
           count: count}
  obj[tashkeelOrder[0]] = t1
  obj[tashkeelOrder[1]] = t2
  obj[tashkeelOrder[2]] = t3
  obj[tashkeelOrder[3]] = t4
  obj[tashkeelOrder[4]] = t5
  obj[tashkeelOrder[5]] = t6
  obj[tashkeelOrder[6]] = t7
  obj[tashkeelOrder[7]] = t8
  obj[tashkeelOrder[8]] = t9
  obj[tashkeelOrder[9]] = t10
  obj[tashkeelOrder[10]] = t11
  obj[tashkeelOrder[11]] = t12
  return obj
}