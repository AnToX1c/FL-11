function assign(target, ...sources) {
  sources.forEach(function(item) {
    for (let key in item) {
      if ({}.hasOwnProperty.call(item, key)) {
        target[key] = item[key];
      }
    }
  });
  return target;
}
