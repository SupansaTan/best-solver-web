const { performance } = require('perf_hooks');

function newton(f, df, x0, epsilon, max_iter) {
  let xn = x0

  for (var n=0; n < max_iter; n++) {
    fxn = f(xn)

    if(Math.abs(fxn) < epsilon) {
      console.log('Found solution after ' + n + ' iterations')
      return xn
    }

    df_xn = df(xn)

    if(df_xn == 0) {
      console.log('Zero derivative. No solution found.')
      return null
    }

    xn = xn - fxn / df_xn
  }

  console.log('Exceeded maximum iterations. No solution found.')
  return null
}

const f = function(x) {
  return Math.exp(-x) - x
}
const df = function(x) {
  return -Math.exp(-x) - 1
}

const t0 = performance.now()
const sol = newton(f, df, 1.0, 1e-15, 16)
const t1 = performance.now()

console.log ('Newton : '+ (t1-t0).toFixed(3))
console.log('Used time : ' + sol + ' ms.')