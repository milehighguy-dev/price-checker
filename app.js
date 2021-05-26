
const priceChecker = require("./priceChecker.js")
const csv = require('csv-parser')
const fs = require('fs')

const results = [];
const { Command } = require('commander');


// const program = new Command();
// program.version('0.0.1');

// program.option('-f, --file', "Input csv file with format: first currency, second currency, percent threshold, and check rate (sec). Optionally multi line")

// program.parse(process.argv)



// fs.createReadStream('./multi_input.csv')
//   .pipe(csv({headers: false}))
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);

//     for (let i of results) {

//         console.log(i)

//         let firstCurrency = i[0];
//         let secondCurrency = i[1];
//         let thersholdPercent = i[2];
//         let intervalTime = i[3] * 1000;

//         // priceChecker.requestRateInterval(firstCurrency, secondCurrency, thersholdPercent, intervalTime );
//     }
    
//     // [
//     //   { NAME: 'Daffy Duck', AGE: '24' },
//     //   { NAME: 'Bugs Bunny', AGE: '22' }
//     // ]
//   });

priceChecker.requestRateInterval("BTC", "USD", 0.01, 5000);