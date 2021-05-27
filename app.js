
const csv = require('csv-parser')
const fs = require('fs')

const results = [];
const { program } = require('commander');
const { PriceCheck } = require("./priceChecker.js");
const priceChecker = require('./priceChecker.js');

program.description("An application to alert the user to exchange rate changes")
program.option('-i, --input-file <type>', "Input csv file with format: first currency, second currency, percent threshold, and check rate (sec). Optionally multi line")
program.option('-c1, --first <type>', "first currency", "BTC")
program.option('-c2, --second <type>', "second currency", "USD")
program.option('-p, --percent <type>', "threshold of percent difference", 0.01)
program.option('-t, --interval <type>', "interval (in seconds) between each ticker retreival", 5)

program.parse();

const options = program.opts();

console.log(options.inputFile)
console.log(options.first)
console.log(options.second)
console.log(options.percent)
console.log(options.interval)


if (""+options.inputFile != "") {

    console.log("Parsing csv for multiple price checks. Ignoring other arguments")
    parseCsv(""+options.inputFile)

} else {

    console.log("Creating single price checker.")
    new PriceCheck().requestRateInterval(""+options.first, ""+options.second, 1*options.percent, options.interval * 1000);
}


/**
 * 
 * create price checker for each entry in the csv
 * 
 * @param {} csvFile 
 */
function parseCsv(csvFile) {

    fs.createReadStream('./multi_input.csv')
    .pipe(csv({headers: false}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
  
      for (let i of results) {
  
          console.log(i)
  
          let firstCurrency = i[0];
          let secondCurrency = i[1];
          let thersholdPercent = i[2];
          let intervalTime = i[3] * 1000;
  
          new PriceCheck().requestRateInterval(firstCurrency, secondCurrency, thersholdPercent, intervalTime );
      }
      
    });

}
