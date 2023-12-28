function ucFirst(str) {

  if (str === '') {
    return str;
  }
  
  let result = str.slice(1);
  return str[0].toUpperCase() + result;
}
