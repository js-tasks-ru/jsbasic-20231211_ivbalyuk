function camelize(str) {
  const arr = str.split("-");
  return arr.map((element, index) => {
    if (index == 0) {
      return element;
    } 
    return element[0].toUpperCase() + element.slice(1);
  }).join('');
}

  
