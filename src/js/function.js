function f1(x) {
  return Math.exp(-x) - x
}

function f2(x) {
  return x*Math.exp(0.5*x) + 1.2*x - 5
}

function f3(x) {
  return x**3 - x -1
}

function f4(x) {
  return x**3 - x**2 -1
}

function f5(x) {
  return x**2 -2
}

function f6(x) {
  return Math.exp(-Math.pow(x,2)) - x
}

function f7(x) {
  return -x + 1 
}

function f8(x) {
  return Math.pow(1/5,x) - 2
}

function f9(x) {
  return Math.pow(x,3) - 3*Math.pow(x,2) - 4*x + 5
}

function f10(x) {
  return -(Math.pow(1/3,x)) + 2
}

function df1(x) {
  return -Math.exp(-x) - 1
}

function df2(x) {
  return Math.exp(0.5*x) * (0.5*x+1) + 1.2
}

function df3(x) {
  return 3*Math.pow(x,2) - 1
}

function df4(x) {
  return 3*Math.pow(x,2) - 2*x
}

function df5(x) {
  return 2*x
}

function df6(x) {
  return -2*x*Math.exp(-Math.pow(x,2)) - 1
}

function df7(x) {
  return -1
}

function df8(x) {
  return -Math.log(5) * Math.pow(1/5,x);
}

function df9(x) {
  return 3*Math.pow(x,2) - 6*x - 4
}

function df10(x) {
  return Math.log(3) * Math.pow((1/3),x)
}

export function getFunction(id){
  switch(id) {
    case 1:
      return f1
    case 2:
      return f2
    case 3:
      return f3
    case 4:
      return f4
    case 5:
      return f5
    case 6:
      return f6
    case 7:
      return f7
    case 8:
      return f8
    case 9:
      return f9
    case 10:
      return f10;
    default:
      return 0;
  }
}

export function getDiffFunction(id) {
  switch(id) {
    case 1:
      return df1
    case 2:
      return df2
    case 3:
      return df3
    case 4:
      return df4
    case 5:
      return df5
    case 6:
      return df6
    case 7:
      return df7
    case 8:
      return df8
    case 9:
      return df9
    case 10:
      return df10
    default:
      return 0;
  }
}