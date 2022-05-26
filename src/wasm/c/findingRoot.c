#include <stdio.h>
#include <emscripten.h>
#include <stdlib.h>
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
      return exp(-pow(x,2)) - x;
      break;
    case 7:
      return -x + 1;
      break;
    case 8:
      return pow(0.2,x) - 2;
      break;
    case 9:
      return pow(x,3) - 3*(pow(x,2)) - 4*x + 5;
      break;
    case 10:
      return - pow(0.3333,x) + 2;
      break;
    default:
      return 0;
  }
  return 0;
}

double df(double x)
{
  switch(selectFunc)
  {
    case 1:
      return - exp(-x) - 1;
      break;
    case 2:
      return 0.5*exp(0.5*x)*x + exp(0.5*x) + 1.2;
      break;
    case 3:
      return 3*pow(x,2) - 1;
      break;
    case 4:
      return 3*pow(x,2) - 2*x;
      break;
    case 5:
      return 2*x;
      break;
    case 6:
      return -2 * x * exp(-pow(x,2)) - 1;
      break;
    case 7:
      return -1;
      break;
    case 8:
      return -log(5) * pow(0.2,x);
      break;
    case 9:
      return 3*pow(x,2) - 6*x - 4;
      break;
    case 10:
      return log(3) * pow(0.3333,x);
      break;
    default:
      return 0;
  }
  return 0;
}

double bisection(float a, float b, float tol)
{
  int i;
  double an, bn, mn, fmn, fa, fb;

  i = 1;
  an = a;
  bn = b;
  fa = f(a);
  fb = f(b);
  while((bn-an) > tol) {
    mn = an + (bn-an)/2.0;
    fmn = f(mn);
    i += 1;

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

EMSCRIPTEN_KEEPALIVE
double findBisection(int num)
{
  selectFunc = num;
  double result;
  result = bisection(-1.0, 2, 0.01);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentBisection(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = bisection(-1.0, 2, 16);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
}

double newton(float x0, float e, int maxIter)
{
  int i;
  double xn, fxn, df_xn;

  xn = x0;
  for(i=0; i<maxIter; i++)
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

EMSCRIPTEN_KEEPALIVE
double findNewton(int num)
{
  selectFunc = num;
  double result;
  result = newton(1.0, 1e-15, 16);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentNewton(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = newton(1.0, 1e-15, 16);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
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
  for(i=0; i<step; i++)
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

EMSCRIPTEN_KEEPALIVE
double findSecant(int num)
{
  selectFunc = num;
  double result;
  result = secant(-1.0, 2, 16);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentSecant(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = secant(-1.0, 2, 16);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
}

double regula(float a, float b, int maxIter)
{
  int i;
  double an, bn, mn;

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
    else if(f(mn) == 0)
    {
      return mn;  // found exact solution
    }
  }
  return an - (bn-an) * f(an)/(f(bn) - f(an));
}

EMSCRIPTEN_KEEPALIVE
double findRegulaFalsi(int num)
{
  selectFunc = num;
  double result;
  result = regula(-1.0, 2, 16);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentRegulaFalsi(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = regula(-1.0, 2, 16);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
}