import { getFunction } from "../function";

function trapezoid(f, a, b, N) {
  let dx = ( b - a ) / N;
  let Nx = a , Nx1 = a + dx;
  let xmid;
  let sum = 0;
  let result;
  if(f(a)*f(b) >=  0){
    return -1; // fails (both have the same sign)
  }

  for(let i = 1; i <= N ; i++){
    sum += f(Nx) + f(Nx1);
    Nx += dx;
    Nx1 += dx;
  }
  result = sum*dx/2;
  return result;
}

export function getTrapezoid(funcSelect) {
  const t0 = performance.now();
  const result = trapezoid(getFunction(funcSelect), -1.0, 2, 20)
  const t1 = performance.now();
  return [result, t1-t0]
}