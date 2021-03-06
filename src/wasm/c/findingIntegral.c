#include <stdio.h>
#include <emscripten.h>
#include <math.h>
#include <time.h>
#include <stdlib.h>
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

double reimann(double a, double b, int N){
    double dx = ( b - a ) / N;
    double Nx = a , Nx1 = a + dx;
    double xmid;
    double sum = 0;

    if(f(a)*f(b) >=  0){
    return -1; // fails (both have the same sign)
    }

    for(int i = 1; i <= N ; i++){
        xmid = (Nx + Nx1)/2;
        sum += f(xmid)*dx;
        Nx += dx;
        Nx1 += dx;
    }
    return sum;
}

EMSCRIPTEN_KEEPALIVE
double findReimann(int num)
{
  selectFunc = num;

  double result;
  result = reimann(-1.0, 2, 20);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentReimann(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = reimann(-1.0, 2, 20);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
}

double trapezoid(double a, double b, int N){
    double dx = ( b - a ) / N;
    double Nx = a , Nx1 = a + dx;
    double xmid;
    double sum = 0;
    double result;
    if(f(a)*f(b) >=  0){
    return -1; // fails (both have the same sign)
    }

    for(int i = 1; i <= N ; i++){
        sum += f(Nx) + f(Nx1);
        Nx += dx;
        Nx1 += dx;
    }
    result = sum*dx/2;
    return result;
}

EMSCRIPTEN_KEEPALIVE
double findTrapezoid(int num)
{
  selectFunc = num;

  double result;
  result = trapezoid(-1.0, 2, 20);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentTrapezoid(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = trapezoid(-1.0, 2, 20);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
}

double simpson(double a, double b, int N){
  if((N % 2) != 0){
    return -1;
  }
  double dx = ( b - a ) / N;
  double result;
  double integration;
  double k;

  integration = f(a) + f(b);
  for(int i = 1; i <= N-1; i++){
    k = a + i*dx;
    if(i%2==0)
    {
      integration = integration + 2 * f(k);
    }
    else
    {
      integration = integration + 4 * f(k);
    }
  }

  result = integration * dx/3;
  return result;
}

EMSCRIPTEN_KEEPALIVE
double findSimpson(int num)
{
  selectFunc = num;

  double result;
  result = simpson(-1.0, 2, 20);

  return result;
}

EMSCRIPTEN_KEEPALIVE
char* timeSpentSimpson(int num)
{
  char *timeString = malloc(30);
  selectFunc = num;
  double result;

  clock_t begin = clock();
  for(int i=0; i<100; i++) {
    result = simpson(-1.0, 2, 20);
  }
  clock_t end = clock();

  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  sprintf(timeString,"%.3f", (time_spent * 1000)/100);
  return timeString;
}