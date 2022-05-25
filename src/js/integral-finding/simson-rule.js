import { getFunction } from "../function";

function simson(f, a, b, N){
  if((N % 2 ) !== 0){
    return -1;
  }

  let dx = ( b - a ) / N;
  let dx2 = 2*dx;
  let Nx = a , Nx1 = a + dx , Nx2 = a + dx2;
  let xmid;
  let sum = 0;
  let result;

  if(f(a)*f(b) >=  0){
    return -1; // fails (both have the same sign)
  }

  for(let i = 1; i <= N/2 ; i++){
    sum = f(Nx) + f(Nx2) + 4 * f(Nx1);
    Nx += dx2;
    Nx1 += dx2;
    Nx2 += dx2;
  }

  result = sum*dx/3;
  return result;
}

export function getSimson(funcSelect) {
  const t0 = performance.now();
  const result = simson(getFunction(funcSelect), -1.0, 2, 20)
  const t1 = performance.now();
  return [result, t1-t0]
}