const got = require("got")

class PriceCheck {

    constructor() {
        this.lastTick;
        this.requestTimerHandle;

        this.absolutePercentDiff = this.absolutePercentDiff.bind(this);
        this.alertDifference = this.alertDifference.bind(this);
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
     * send message to standard out if price difference too high
     * 
     * @param {*} currentTick 
     * @param {*} threshold - a percent  
     */
     alertDifference(currentTick, threshold) {

        if (this.lastTick != undefined) {

            let lastPrice = Number(this.lastTick.ask);
            let currentPrice = Number(currentTick.ask);

            let diff = this.absolutePercentDiff(lastPrice, currentPrice);

        if (diff >= threshold) {
            console.log("ALERT: price changed " + diff + " percent")
        } 
        }

        this.lastTick = currentTick;
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
        console.log("requesting conversion rate between " + first + " and " + second)
        
        let currentTickData = await this.getPrice('https://api.uphold.com/v0/ticker/' + first + '-' + second)
        let currentTick = JSON.parse(currentTickData);
        this.alertDifference(currentTick, threshold);

    }
}

module.exports = { PriceCheck : PriceCheck}