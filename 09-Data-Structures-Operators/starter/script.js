'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    [weekdays[4]]: {
        open: 11,
        close: 23,
    },
    [weekdays[5]]: {
        open: 0, // Open 24 hours
        close: 12 + 12,
    },
};

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    // ES6 enhanced object literals
    openingHours,

    order(starterIndex, mainIndex) {
        return [(this.starterMenu)[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery({
                      starterIndex = 1,
                      mainIndex = 0,
                      time = '20:00',
                      address
    }) {
        console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
    },

    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
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

// THE SPREAD OPERATOR (...)
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

// REST PATTERN AND PARAMETERS
// 1) Destructuring

// SPREAD, because on RIGHt side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu
];
console.log(pizza, risotto, otherFood);

// Objects
const {sat, ...weekdays} = restaurant.openingHours;
console.log(sat, weekdays);

// 2) Functions
const add = function(...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

// The spread operator is used where we would otherwise write VALUES separated by commas
// The rest pattern is used where we would otherwise write VARIABLE NAMES separated by commas

// SHORT CIRCUITING (&& and ||)
console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Martin');
console.log('' || 'Martin');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
console.log(0 && 'Martin');
console.log(7 && 'Martin');

console.log('Hello' && 23 && null && 'Martin');

// Practical example
if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// The || operator will return the first truthy value of all the operands, or the last value (default values)
// The && operator will return the first falsy value, or the last value (execute code in second operand if first is truthy)

// THE NULLISH COALESCING OPERATOR (??)
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// CODING CHALLENGE #1
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5.
const {team1, x: draw, team2} = game.odds;
console.log(team1, draw, team2);

// 6.
const printGoals = function(...playerNames) {
    playerNames.forEach(n => console.log(n));
    console.log(`${playerNames.length} goals were scored`);
};
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7.
team1 < team2 && console.log(game.team1);
team1 > team2 && console.log(game.team2);

// LOOPING ARRAYS: THE FOR-OF LOOP
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
    console.log(item);
}

for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);

// ENHANCED OBJECT LITERALS

// OPTIONAL CHAINING (.?)
// Without optional chaining
if(restaurant.openingHours.mon && restaurant.openingHours.mon.open) {
    console.log(restaurant.openingHours.mon.open);
}

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
    console.log(day);
    const open =restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{name: 'Martin', email: 'hello@martin.io'}];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');

if (users.length >= 0) {
    console.log(users[0].name);
} else {
    console.log('User array empty');
}
*/

// LOOPING OBJECTS: OBJECT KEYS, VALUES AND ENTITIES
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days:`;
for (const day of properties) {
    openStr += `${day}, `
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const x of entries) {
    const [key, {open, close}] = x;
    console.log(`On ${key} we open at ${open} and close at ${close}`);
}
