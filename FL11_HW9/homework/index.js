const getNumbers = str => {
  let result = [];
  const arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(Number(arr[i]))) {
      result.push(Number(arr[i]));
    }
  }
  return result;
};

const findTypes = (...args) => {
  let result = {};
  for (let i = 0; i < args.length; i++) {
    let elemType = typeof args[i];
    result[elemType] = result.hasOwnProperty(elemType) ? result[elemType] + 1 : 1;
  }
  return result;
};

const executeforEach = (arr, func) => {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
};

const mapArray = (arr, func) => {
  let result = [];
  executeforEach(arr, function(element){
      result.push(func(element));
    });
  return result;
};

const filterArray = (arr, func) => {
  let result = [];
  executeforEach(arr, function(element){
    if (func(element)) {
      result.push(element);
    }
  });
  return result;
};

const showFormattedDate = (inputDate) => {
  const month = inputDate.toLocaleString('default', {month: 'short'});
  return `Date: ${month} ${inputDate.getDate()} ${inputDate.getFullYear()}`;
};

const canConvertToDate = (str) => !isNaN(new Date(str));

const daysBetween = (date1, date2) => {
  const MILISEC = 1000, SEC = 60, MIN = 60, HOURS = 24;
  const MS_PER_DAY = MILISEC * SEC * MIN * HOURS;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor(Math.abs(utc2 - utc1) / MS_PER_DAY);
};

const getAmountOfAdultPeople = (data) => {
  const DAYS_PER_YEAR = 365, YEARS = 18;
  const DAYS_FOR_ADULT = DAYS_PER_YEAR * YEARS;
  const today = new Date();
  return filterArray(data, function(el) {
    return daysBetween(today, new Date(el.birthday)) > DAYS_FOR_ADULT;
  }).length;
};

const keys = (data) => {
  let result = [];
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      result.push(key);
    }
  }
  return result;
};

const values = (data) => {
  let result = [];
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      result.push(data[key]);
    }
  }
  return result;
};
