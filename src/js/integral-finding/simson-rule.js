import { getFunction } from "../function";

function linespace(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

function simson(f, a, b, N){
  if((N % 2) === 1){
    return -1;
  }

  let result
  let y=[], y1=[], y2=[], y3=[], sum = []
  let dx = ( b - a ) / N;
  let x = linespace(a, b, N+1);

  x.map(item => y.push(f(item)))
  y.forEach((item, index) => {
    if(index%2 === 0 && index<N) { 
      y1.push(item) 
    }
    if((index > 0) && (index%2 !== 0)) {
      y2.push(item) 
    }
    if((index > 1) && (index%2 === 0)) {
      y3.push(item) 
    }
  })
  for(var i = 0; i < y1.length; i++) {
    sum.push(y1[i] + 4*y2[i] + y3[i]);
  }

  result = dx/3 * sum.reduce((a, b) => a + b, 0)
  return result;
}

export function getSimson(funcSelect) {
  let result;

  const t0 = performance.now();
  for(let i=0; i<100; i++) {
    result = simson(getFunction(funcSelect), -1.0, 2, 20)
  }
  const t1 = performance.now();
  return [result, ((t1-t0)/100).toFixed(3)]
}