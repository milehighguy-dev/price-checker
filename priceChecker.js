const got = require("got")

/**
 * 
 * Uses Uphold API to detect price swings
 * 
 */
class PriceCheck {

    constructor() {

        //the previous price tick to compare with
        this.lastTick;

        this.requestTimerHandle;

        this.url = 'https://api.uphold.com/v0/ticker/';

        //bind so we can use "this" context
        this.absolutePercentDiff = this.absolutePercentDiff.bind(this);
        this.updateDifference = this.updateDifference.bind(this);
        this.requestRateInterval = this.requestRateInterval.bind(this);
        this.requestRate = this.requestRate.bind(this);
        this.getPrice = this.getPrice.bind(this);
    }

    /**
     * 
     * get the absolute percent difference between two numbers
     * 
     * @param {*} firstNum 
     * @param {*} secondNum 
     * @returns 
     */
     absolutePercentDiff(firstNum, secondNum) {

        return ( Math.abs(firstNum - secondNum) / ((firstNum + secondNum) /2) ) * 100
    }

    /**
     * update the last tick and calculate the percent change
     * 
     * @param {*} currentTick 
     * @param {*} threshold - a percent  
     */
     updateDifference(currentTick) {

        let diff = 0;

        if (this.lastTick != undefined) {

            let lastPrice = Number(this.lastTick.ask);
            let currentPrice = Number(currentTick.ask);

            diff = this.absolutePercentDiff(lastPrice, currentPrice);

        }

        this.lastTick = currentTick;

        //return boolean for testability (for now)
        return diff;
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
            clearInterval(this.requestTimerHandle)
        }
        this.requestTimerHandle = setInterval(this.requestRate, interval, first, second, threshold)
    }

    async getPrice(url) {
        const response = await got(url);
        const data = await response.body;
        return data;
    }

    async requestRate(first, second, threshold) {
        
        let currentTickData = await this.getPrice(this.url + first + '-' + second)
        let currentTick = JSON.parse(currentTickData);
        console.log(first + " is " + currentTick.ask + " " + second);

        let diff = this.updateDifference(currentTick);
        if (diff >= threshold) {
            console.log(first + " changed " + diff + " percent");
        }

    }
}

module.exports = { PriceCheck : PriceCheck}