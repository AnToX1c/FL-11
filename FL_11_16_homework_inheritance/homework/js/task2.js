function create(protoObj, ...props) {
  let resultObj = {};
  resultObj.__proto__ = protoObj;
  props.forEach(function(prop) {
    for (let key in prop) {
      if ({}.hasOwnProperty.call(prop, key)) {
        resultObj[key] = prop[key];
      }
    }
  })
  return resultObj;
}
