function addOne(x) {
  return x + 1;
}
const pipe = function() {
  const [a, ...otherArgs] = arguments;
  let result = a;
  for (let i = 0; i < otherArgs.length; i++) {
    result = otherArgs[i](result);
  }
  return result;
}
pipe(1, addOne, addOne);
