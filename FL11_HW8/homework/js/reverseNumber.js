const reverseNumber = num => {
  let a = 0;
  let result = 0;
  while (num) {
    a = num % 10;
    result = result * 10 + a;
    num = parseInt(num / 10);
  }
  return result;
};
reverseNumber(123);
