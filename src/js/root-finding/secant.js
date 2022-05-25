import { getFunction } from "../function";

function secant(f, a, b, step)
{
  let i, an, bn, mn, fmn;

  if(f(a)*f(b) >=  0)
  {
    return -1; // fails (both have the same sign)
  }

  an = a;
  bn = b;
  for(i=0; i<step; i++)
  {
    mn = an - f(an)*(bn-an)/(f(bn)-f(an));
    fmn = f(mn);

    if(f(an)*fmn < 0)
    {
      bn = mn;
    }
    else if(f(bn)*fmn < 0)
    {
      an = mn;
    }
    else if(fmn === 0)
    {
      return mn;  // found exact solution
    }
    else
    {
      return -1;
    }
  }
  return an - f(an)*(bn-an)/(f(bn)-f(an));
}

export function getSecant(funcSelect) {
  const t0 = performance.now();
  const result = secant(getFunction(funcSelect), -1.0, 2, 16)
  const t1 = performance.now();
  return [result, t1-t0]
}