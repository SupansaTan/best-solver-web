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
    case 2:
      return x*exp(0.5*x) + 1.2*x - 5;
      break;
    case 3:
      return pow(x,3) - x - 1;
      break;
    case 4:
      return pow(x,3) - pow(x,2) - 1;
      break;
    case 5:
      return pow(x,2) - 2;
      break;
    case 6:
      return exp(pow(-x,2)) - x;
      break;
    case 7:
      return (-3.36)*x + 15.25;
      break;
    case 8:
      return pow(1/5,x) - 2;
      break;
    case 9:
      return pow(x,3) - 3*pow(x,2) - 4*x + 5;
      break;
    case 10:
      return pow(-(1/3),x) + 2;
      break;
    default:
      return -x;
  }
  return 0;
}

double bisection(float a, float b, int step)
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

EMSCRIPTEN_KEEPALIVE
void findBisection(int num)
{
  selectFunc = num;

  double result, timeSpent;
  clock_t start = clock();
  result = bisection(-0.7, 5, 16);
  clock_t end = clock();

  timeSpent = (double)(end - start)/ CLOCKS_PER_SEC * 1000;
  printf("sol: %.15lf\n", result);
  printf("time spent: %.8lf\n", timeSpent);
}
