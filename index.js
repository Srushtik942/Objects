const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let person = {
  firstName: 'Amit',
  lastName: 'Kumar',
  gender: 'Male',
  age: 29,
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}

app.get('/person/fullName', (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});
function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get('/person/firstName-gender', (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json({ firstNameAndGender: firstNameAndGender });
});

function getIncrementAge(person) {
  person.age = person.age + 1;
  return person;
}

app.get('/person/increment-age', (req, res) => {
  let updatedAge = getIncrementAge(person);
  res.json(updatedAge);
});

function getFullNameAndMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get('/person/fullName-Membership', (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});

function getFinalPrice(cartTotal, isMember) {
  let discount = 0.1;
  let finalPrice;
  if (isMember) {
    finalPrice = cartTotal * (1 - discount);
  } else {
    finalPrice = cartTotal;
  }

  return { finalPrice: finalPrice.toFixed(2) };
}

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);

  res.json(finalPrice);
});

function getShippingCost(cartTotal, isMember) {
  let finalShippingCost = 0;
  if (cartTotal > 500 && isMember === true) {
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let shippingCost = getShippingCost(cartTotal, person.isMember);

  res.json({ shippingCost: shippingCost.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
