const isBigger = (a, b) => a > b;
const isSmaller = (a, b) => !isBigger(a, b);
isSmaller(5, -1);
