import { getFunction } from "../function";

function reimann(f, a, b, N) {
  let dx = ( b - a ) / N;
  let Nx = a , Nx1 = a + dx;
  let xmid;
  let sum = 0;

  if(f(a)*f(b) >=  0){
    return -1; // fails (both have the same sign)
  }

  for(let i = 1; i <= N ; i++){
    xmid = (Nx + Nx1)/2;
    sum += f(xmid)*dx;
    Nx += dx;
    Nx1 += dx;
  }
  return sum;
}

export function getReimann(funcSelect) {
  let result;

  const t0 = performance.now();
  for(let i=0; i<100; i++) {
    result = reimann(getFunction(funcSelect), -1.0, 2, 20)
  }
  const t1 = performance.now();
  return [result, ((t1-t0)/100).toFixed(3)]
}