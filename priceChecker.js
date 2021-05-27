const got = require("got")
const axios = require('axios');

    // handle for request interval
    var requestTimerHandle;

    //JSON object holding the last ticker price
    var lastTick;

    /**
     * 
     * get the absolute percent difference between two numbers
     * 
     * @param {*} firstNum 
     * @param {*} secondNum 
     * @returns 
     */
     function absolutePercentDiff(firstNum, secondNum) {

        return ( Math.abs(firstNum - secondNum) / ((firstNum + secondNum) /2) ) * 100
    }

    /**
     * send message to standard out if price difference too high
     * 
     * @param {*} currentTick 
     * @param {*} threshold - a percent  
     */
     function alertDifference(currentTick, threshold) {

        if (lastTick != undefined) {

            let lastPrice = Number(lastTick.ask);
            let currentPrice = Number(currentTick.ask);

            let diff = absolutePercentDiff(lastPrice, currentPrice);

        if (diff >= threshold) {
            console.log("ALERT: price changed " + diff + " percent")
        } 
        }

        lastTick = currentTick;
    }
    
    /**
     * 
     * @param {*} first first currency
     * @param {*} second second currency
     * @param {*} threshold % difference in prices from last retreival to send alert
     * @param {*} interval how long to wait before retreiving price again
     */
    requestRateInterval = function(first, second, threshold, interval) {
        if (typeof this.requestTimerHandle != 'undefined') {
            clearInterval(requestTimerHandle)
        }
        this.requestTimerHandle = setInterval(requestRate, interval, first, second, threshold)
    }

    async function getPrice(url) {
        const response = await got(url);
        const data = await response.body;
        return data;
    }

    async function requestRate(first, second, threshold) {
        console.log("requesting conversion rate between " + first + " and " + second)
        
        let currentTickData = await getPrice('https://api.uphold.com/v0/ticker/' + first + '-' + second)
        let currentTick = JSON.parse(currentTickData);
        alertDifference(currentTick, threshold);

        // try {
        //     const response = await got('https://api.uphold.com/v0/ticker/' + first + '-' + second);
        //     console.log(response.body);
        //     let currentTick = JSON.parse(response.body);
        //     alertDifference(currentTick, threshold);

        // } catch (error) {
        //     console.log(error.response.body);
        // }
    }


// var checker = new PriceCheck("BTC", "USD", 0.01, 5000);
// requestRateInterval("BTC", "USD", 0.01, 5000);

module.exports = {requestRateInterval: requestRateInterval,
                    absolutePercentDiff: absolutePercentDiff}