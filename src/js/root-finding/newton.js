import { getFunction, getDiffFunction } from "../function";

function newton(f, df, x0, e, maxIter) {
  let i, xn, fxn, df_xn;

  xn = x0;
  for(i=0; i<maxIter; i++)
  {
    fxn = f(xn);
    if(Math.abs(fxn) < e)
    {
      return xn;
    }

    df_xn = df(xn);
    if(df_xn === 0)
    {
      return -1;
    }

    xn = xn - fxn/df_xn;
  }
  return -1;
}

export function getNewton(funcSelect) {
  let result;

  const t0 = performance.now();
  for(let i=0; i<100; i++) {
    result = newton(getFunction(funcSelect), getDiffFunction(funcSelect), 1.0, 1e-15, 16)
  }
  const t1 = performance.now();
  return [result, ((t1-t0)/100).toFixed(3)]
}