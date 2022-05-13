#include <stdio.h>
// #include <emscripten.h>
#include <math.h>
#include <time.h>

double f(double x)
{
  return exp(-x) - x;
}

double secant(float a, float b, int step)
{
  int i;
  double an, bn, mn, fmn;

  if(f(a)*f(b) >=  0)
  {
    return -1; // fails (both have the same sign)
  }

  an = a;
  bn = b;
  for(i=0; i<(step+1); i++)
  {
    mn = an - f(an)*(bn-an)/(f(bn)-f(an));
    fmn = f(mn);

    if(f(an)*fmn < 0)
    {
      an = an;
      bn = mn;
    }
    else if(f(bn)*fmn < 0)
    {
      an = mn;
      bn = bn;
    }
    else if(fmn == 0)
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

int main()
{
  double result, seconds;
  clock_t start = clock();
  result = secant(1.0, 1e-15, 16);
  clock_t end = clock();

  seconds = (double)(end - start)/ CLOCKS_PER_SEC * 1000;
  printf("sol : %.15lf\n", result);
  printf("time spent : %.8lf", seconds);
  return 0;
}
