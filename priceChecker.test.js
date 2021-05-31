const { PriceCheck } = require("./priceChecker.js");

test('reports that the percent difference between 5 and 7 is 33.333- percent', () => {
    priceChecker = new PriceCheck();
    expect(priceChecker.absolutePercentDiff(5,7)).toBe(33.33333333333333)
});


test("reports that there is a price difference of 0.05642", () => {

    priceChecker = new PriceCheck();
    priceChecker.lastTick = { ask: '37730.01689', bid: '37612.37741', currency: 'USD' };
    let currentTick = { ask: '37751.31227', bid: '37553.17977', currency: 'USD' };
    expect(priceChecker.updateDifference(currentTick)).toBe(0.05642555645744595)
})

test("reports that there is a price difference of 0", () => {

    priceChecker = new PriceCheck();
    priceChecker.lastTick = { ask: '37751.31227', bid: '37553.17977', currency: 'USD' };
    let currentTick = { ask: '37751.31227', bid: '37553.17977', currency: 'USD' };
    expect(priceChecker.updateDifference(currentTick)).toBe(0)
})

test("reports that the lastTick was updated", () => {

    priceChecker = new PriceCheck();
    priceChecker.lastTick = { ask: '37730.01689', bid: '37612.37741', currency: 'USD' };
    let currentTick = { ask: '37751.31227', bid: '37553.17977', currency: 'USD' };
    priceChecker.updateDifference(currentTick)
    expect(priceChecker.lastTick.ask).toBe('37751.31227')
})