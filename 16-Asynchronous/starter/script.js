'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = (data, className = '') => {
  const html = `
  <article class='country ${className}'>
    <img class='country__img' src='${data.flag}' />
    <div class='country__data'>
      <h3 class='country__name'>${data.name}</h3>
      <h4 class='country__region'>${data.region}</h4>
      <p class='country__row'><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
      <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
      <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// 244. Our First AJAX Call: XMLHttpRequest

/*
const getCountryAndNeighbour = country => {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) {
      return;
    }

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function() {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

// 246. Welcome to Callback Hell

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// 247. Promises and the Fetch API
// 248. Consuming Promises
// 249. Chaining Promises
// 250. Handling Rejected Promises

const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Country not found (${response.status})`);
    }
  });
};

// const getCountryData = country => {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(`Country not found (${response.status})`);
//       }
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'sdfsdfsdf';
//
//       if (!neighbour) return;
//
//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(`Country not found (${response.status})`);
//       }
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => countriesContainer.style.opacity = 1);
// };

// 251. Throwing Errors Manually

const getCountryData = country => {
  // Country 1
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => countriesContainer.style.opacity = 1);
};

btn.addEventListener('click', () => getCountryData('portugal'));

getCountryData('au');

// 252. Coding Challenge #1

const whereAmI = (lat, lng) => {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Problem with geocoding ${res.status}`);
      }
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Country not found (${res.status})`);
      }
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} 💥`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

// 254. The Event Loop in Practice

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');

// 255. Building a Simple Promise

const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottery draw is happening 🔮');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promisifying setTimeout
const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  }).then(() => {
  console.log('3 seconds passed');
  return wait(1);
}).then(() => {
  console.log('4 seconds passed');
})

Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').then(x => console.error(x));
*/

// 256. Promisifying the Geolocation API


const getPosition = () => new Promise((resolve, reject) => {
  // navigator.geolocation.getCurrentPosition(
  //   position => resolve(position),
  //   err => reject(err)
  // );
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

// getPosition().then(pos => console.log(pos));

const whereAmI = () => {
  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Problem with geocoding ${res.status}`);
      }
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Country not found (${res.status})`);
      }
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
