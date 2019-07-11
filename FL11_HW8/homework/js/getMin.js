const getMin = function() {
  let minItem = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    minItem = arguments[i] > minItem ? minItem : arguments[i];
  }
  return minItem;
};
getMin(3, 0, -3); 
