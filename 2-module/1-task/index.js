function sumSalary(salaries) {
  let totalSalary = 0;
  
  for (let key in salaries) {
    let presentValue = salaries[key];

    if (typeof presentValue === 'number' && isFinite(presentValue)) {
      totalSalary += presentValue;
    } 
  }
  return totalSalary;
}
