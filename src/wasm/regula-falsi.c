#include <stdio.h>
// #include <emscripten.h>
#include <math.h>
#include <time.h>

double f(double x)
{
  return exp(-x) - x;
}

double regula(float a, float b, int maxIter)
{
  int i;
  double xn, fxn, df_xn;

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
