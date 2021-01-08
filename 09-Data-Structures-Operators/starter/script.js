'use strict';

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },

    order: function (starterIndex, mainIndex) {
        return [(this.starterMenu)[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function ({
                                 starterIndex = 1,
                                 mainIndex = 0,
                                 time = '20:00',
                                 address
                             }) {
        console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
    }
};

/*
// DESTRUCTURING ARRAYS
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[secondary, main] = [main, secondary];
console.log(main, secondary)

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// DESTRUCTURING OBJECTS
const {
    name: restaurantName,
    openingHours: hours,
    categories: tags
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const {
    menu = [],
    starterMenu: starters = []
} = restaurant;
console.log(menu, starters);

// Mutating variables while destructuring objects
let a = 111;
let b = 999;
const obj = {a: 23, b: 7, c: 14};
({a, b} = obj);
console.log(a, b);

// Nested objects
const {
    fri: {open: o, close: c}
} = openingHours;
console.log(o, c);

restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 2,
    starterIndex: 0
});

restaurant.orderDelivery({
    address: 'Via del Sole, 21',
    starterIndex: 1
});
 */

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// We can only use ... where we would otherwise write comma-separated values

// Create shallow copy of array
const mainMenuCopy = [...restaurant.mainMenu];

// Merge two arrays together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, set. NOT objects
const str = 'Martin';
const letters = [...str, ' ', 'T.'];
console.log(letters);
console.log(...str);
// console.log(`${...str} Tiggerdine`);

// Real-world example
const ingredients = [
    // prompt("Let's make pasta! Ingredient 1?"),
    // prompt('Ingredient 2?'),
    // prompt('Ingredient 3?')
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: 'Guiseppe'};
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
