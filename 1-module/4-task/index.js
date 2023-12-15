function checkSpam(str) {
  str = str.toUpperCase();

  if (str.includes('1xBet'.toUpperCase()) || str.includes('XXX'.toUpperCase())) 
  { return true; }

  return false;
}
