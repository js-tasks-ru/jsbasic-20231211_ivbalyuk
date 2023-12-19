function sumSalary(salaries) {
  let totalSalary = 0;
  
  for (let key in salaries) {
    let presentValue = salaries[key];

    if (typeof presentValue === 'number' 
    && String(presentValue) !== 'NaN' 
    && presentValue !== Infinity 
    && presentValue !== -Infinity) {
      totalSalary += presentValue;
    } 
  }
  return totalSalary;
}
