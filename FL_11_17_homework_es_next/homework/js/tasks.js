// Task 1. Create a function which finds max element in array
const maxElement = arr => Math.max.apply(null, arr);
// const array2 = [1,2,3,4,567,2241,356, 2, 567];
// console.log(maxElement(array2));

// Task 2. Create function which copies array
const copyArray = arr => [...arr];
// const array = [1,2,3];
// const copiedArray = copyArray(array);
// console.log(array, copiedArray);
// console.log(array === copiedArray);

// Task 3. Create function to enhance element with unique id. 
const addUniqueId = obj => Object.assign(obj, {id: Symbol()});
// console.log(addUniqueId({name: 123}));

// Task 4. Write a function which regroups object properties
const regroupObject = obj => {
  const {name: firstName, details} = obj;
  const {id, age, university} = details;
  return {university, user: {age, firstName, id}}
};

const oldObj = {
  name: 'Someone',
  details: {
    id: 1,
    age: 11,
    university: 'UNI'
  }
};
regroupObject(oldObj);

// Task 5.	Create a function which finds unique elements in array
const findUniqueElements = arr => [...new Set(arr)];
// const array = [1,1,23,3,4,5,6,5,4,2,1,1,1];
// console.log(findUniqueElements(array));

// Task 6. Create a function which masks phone number, leaves only last 4 digits. Use padStart
const hideNumber = number => number.slice(-4).padStart(number.length, '*');;
// const phoneNumber = '0123456789';
// console.log(hideNumber(phoneNumber));

// Task 7. Create function which has all parameters always required. If they are not - throw error. Use default parameters feature
const required = () => { throw new Error('Missing property') };
const add = (a = required(), b = required()) => a + b;
// add();
// add(3);
// add(3,4);

// Task 8.
const url = 'https://api.github.com/users/AnToX1c/repos';
const getReposNameVsPromises = url => {
  return fetch(url)
  .then(request => request.text())
  .then(text => JSON.parse(text))
  .then(res => console.log(res.map(it => it.name)))
  .catch(error => console.log(`ERROR: ${error.stack}`));
}
getReposNameVsPromises(url);

// Task 9.
async function getReposNameVsAsyncAwait(url) {
  try {
    const request = await fetch(url);
    const text = await request.text();
    const names = JSON.parse(text).map(it => it.name);
    return console.log(names);
  }
  catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
getReposNameVsAsyncAwait(url);
