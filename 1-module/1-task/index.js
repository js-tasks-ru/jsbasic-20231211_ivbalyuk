function factorial(n) {
  let resultFactorial = 1;

  for (let i = 1; i <= n; i++) {
    resultFactorial = resultFactorial * i;
  }
  return resultFactorial;
}
