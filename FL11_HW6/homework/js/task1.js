const TWO = 2;
const a1 = parseFloat(prompt("Please, enter the A point's numeric value (X)"));
const a2 = parseFloat(prompt("Please, enter the A point's numeric value (Y)"));
const b1 = parseFloat(prompt("Please, enter the B point's numeric value (X)"));
const b2 = parseFloat(prompt("Please, enter the B point's numeric value (Y)"));
const c1 = parseFloat(prompt("Please, enter the C point's numeric value (X)"));
const c2 = parseFloat(prompt("Please, enter the C point's numeric value (Y)"));

console.log(c1 === (a1 + b1) / TWO && c2 === (a2 + b2) / TWO);
