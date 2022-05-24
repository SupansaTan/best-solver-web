import { getFunction } from "../function";

function bisection(f, a, b, tol) {
  let an, bn, mn, fmn, fa, fb;

  an = a;
  bn = b;
  fa = f(a);
  fb = f(b);
  while((bn-an) > tol) {
    mn = an + (bn-an)/2.0;
    fmn = f(mn);

    if(fa*fmn >= 0)
    {
      an = mn;
      fa = fmn;
    }
    else {
      bn = mn;
      fb = fmn;
    }
  }
  return an + (bn-an)/2.0;
}

export function getBisection(funcSelect) {
  const t0 = performance.now();
  const result = bisection(getFunction(funcSelect), -1, 5, 0.01)
  const t1 = performance.now();
  return [result, t1-t0]
}