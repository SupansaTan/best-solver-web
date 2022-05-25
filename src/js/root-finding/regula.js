import { getFunction } from "../function";

function regula(f, a, b, maxIter) {
  let i, an, bn, mn;

  if(f(a)*f(b) >=  0)
  {
    return -1; // fails (both have the same sign)
  }

  an = a;
  bn = b;
  for(i=0; i<maxIter; i++)
  {
    mn = an - (bn-an) * f(an)/(f(bn) - f(an));

    if(f(an)*f(mn) < 0)
    {
      bn = mn;
    }
    else if(f(bn)*f(mn) < 0)
    {
      an = mn;
    }
    else if(f(mn) === 0)
    {
      return mn;  // found exact solution
    }
  }
  return an - (bn-an) * f(an)/(f(bn) - f(an));
}

export function getRegula(funcSelect) {
  const t0 = performance.now();
  const result = regula(getFunction(funcSelect), -1.0, 2, 16)
  const t1 = performance.now();
  return [result, t1-t0]
}