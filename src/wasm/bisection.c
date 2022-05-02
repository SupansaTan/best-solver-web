#include <stdio.h>
#include <emscripten.h>
#include <math.h>
#include <time.h>
int selectFunc = 1;

double f(double x)
{
  switch(selectFunc)
  {
    case 1:
      return exp(-x) - x;
      break;

    default:
      return -x;
  }
  return 0;
}

void EMSCRIPTEN_KEEPALIVE setSelectFunc(int num)
{
  selectFunc = num;
}

double EMSCRIPTEN_KEEPALIVE bisection(float a, float b, int step)
{
  int i;
  double an, bn, mn, fmn;

  if(f(a)*f(b) >=  0)
  {
    return -1;
  }

  an = a;
  bn = b;
  for(i=0; i<(step+1); i++)
  {
    mn = (an+bn)/2;
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
  return (an+bn)/2;
}

int EMSCRIPTEN_KEEPALIVE main()
{
  double result, timeSpent;
  clock_t start = clock();
  result = bisection(1.0, 1e-15, 16);
  clock_t end = clock();

  timeSpent = (double)(end - start)/ CLOCKS_PER_SEC * 1000;
  printf("sol: %.15lf\n", result);
  printf("time spent: %.8lf", timeSpent);
  return 0;
}
