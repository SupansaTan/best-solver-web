#include <stdio.h>
#include <emscripten.h>
#include <math.h>
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
      return -x + 1;
      break;
    case 8:
      return pow(1/5,x) - 2;
      break;
    case 9:
      return pow(x,3) - 3*pow(x,2) - 4*x + 5;
      break;
    case 10:
      return - pow((1/3),x) + 2;
      break;
    default:
      return -x;
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
      return exp(pow(x,2))*(2*x) - 1;
      break;
    case 7:
      return -1;
      break;
    case 8:
      return -log(5) * pow(1/5,x);
      break;
    case 9:
      return 3*pow(x,2) - 6*x - 4;
      break;
    case 10:
      return log(3) * pow((1/3),x);
      break;
    default:
      return -x;
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
  result = reimann(-0.7, 5, 16);

  return result;
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
    return sum;
}

EMSCRIPTEN_KEEPALIVE
double findTrapezoid(int num)
{
  selectFunc = num;

  double result;
  result = trapezoid(-0.7, 5, 20);

  return result;
}

double simpson(double a, double b, int N){
    if((N % 2 ) != 0){
        return -1;
    }
    double dx = ( b - a ) / N;
    double dx2 = 2*dx;
    double Nx = a , Nx1 = a + dx , Nx2 = a + dx2;
    double xmid;
    double sum = 0;
    double result;

    if(f(a)*f(b) >=  0){
        return -1; // fails (both have the same sign)
    }

    for(int i = 1; i <= N/2 ; i++){
        sum = f(Nx) + f(Nx2) + 4 * f(Nx1);
        Nx += dx2;
        Nx1 += dx2;
        Nx2 += dx2;
    }
    result = sum*dx/3;
    return sum;
}

EMSCRIPTEN_KEEPALIVE
double findSimpson(int num)
{
  selectFunc = num;

  double result;
  result = simpson(-0.7, 5, 20);

  return result;
}