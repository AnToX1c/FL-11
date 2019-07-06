const sideAB = parseFloat(prompt('Please, enter the length of the side AB:'));
const sideBC = parseFloat(prompt('Please, enter the length of the side BC:'));
const sideCA = parseFloat(prompt('Please, enter the length of the side CA:'));

if (!(sideAB+sideBC>sideCA && sideBC+sideCA>sideAB && sideCA+sideAB>sideBC)) {
  console.log('Triangle doesn’t exist');
} else if (sideAB === sideBC && sideAB === sideCA) {
  console.log('Equivalent triangle');
} else if (sideAB === sideBC || sideAB === sideCA || sideBC === sideCA) {
  console.log('Isosceles triangle');
} else {
  console.log('Normal triangle');
}
