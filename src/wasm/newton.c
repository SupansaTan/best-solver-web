#include <stdio.h>
// #include <emscripten.h>
#include <math.h>
#include <time.h>

double f(double x)
{
  return exp(-x) - x;
}

double df(double x)
{
  return - exp(-x) - 1;
}

double newton(float x0, float e, int maxIter)
{
  int i;
  double xn, fxn, df_xn;

  xn = x0;
  for(i=0; i<(maxIter+1); i++)
  {
    fxn = f(xn);
    if(fabs(fxn) < e)
    {
      return xn;
    }

    df_xn = df(xn);
    if(df_xn == 0)
    {
      return -1;
    }

    xn = xn - fxn/df_xn;
  }
  return -1;
}

int main()
{
  double result, seconds;
  clock_t start = clock();
  result = newton(1.0, 1e-15, 16);
  clock_t end = clock();

  seconds = (double)(end - start)/ CLOCKS_PER_SEC * 1000;
  printf("sol : %.15lf\n", result);
  printf("time spent : %.8lf", seconds);
  return 0;
}
