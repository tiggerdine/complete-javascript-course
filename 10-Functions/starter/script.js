'use strict';

/*
// Default Parameters

const bookings = [];

const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);

// How Passing Arguments Works: Value vs. Reference

const flight = 'LH234';
const martin = {
    name: 'Martin Tiggerdine',
    passport: 24739479284
}

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284) {
        alert('Checked in');
    } else {
        alert('Wrong passport!');
    }
}

// checkIn(flight, martin);
// console.log(flight);
// console.log(martin);

// Is the same as doing...
// const flightNum = flight;
// const passenger = martin;

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 100000000000);
}

newPassport(martin);
checkIn(flight, martin);

// Functions Accepting Callback Functions

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
    console.log('👋');
}
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// Functions Returning Functions

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
}

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenge
const greetArr = (greeting) => (name) => {console.log(`${greeting} ${name}`)}

greetArr('Hi')('Jonas');

// The call and apply Methods

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${(this.airline)} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    }
}

lufthansa.book('239', 'Martin Tiggerdine');
lufthansa.book('635', 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: []
}

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: []
}

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// The bind Method

// Bind method
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Martin Tiggerdine');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}
// lufthansa.buyPlane();

document.querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// Coding Challenge #1

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        const message = [this.question, ...(this.options), '(Write option number)'].join('\n');
        const answer = Number(prompt(message));

        if (typeof answer === 'number' && answer >= 0 && answer < this.answers.length) {
            this.answers[answer]++;
        }

        this.displayResults();
    },

    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}.`);
        }
    }
};

document.querySelector('.poll').addEventListener('click', () => poll.registerNewAnswer());

poll.displayResults.call({answers: [5, 2, 3]});
poll.displayResults.call({answers: [5, 2, 3]}, 'string');
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]});
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string');
*/

// Immediately Invoked Function Expressions (IIFE)

const runOnce = function () {
    console.log('This will never run again');
}
runOnce();

// IIFE
(function () {
    console.log('This will never run again');
    const isPrivate = 23; // protected from being accidentally overwritten
})();

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
    const isPrivate = 23;
    var notPrivate = 46;
}

// console.log(isPrivate);
console.log(notPrivate);
