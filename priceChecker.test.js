const { PriceCheck } = require("./priceChecker.js");

test('reports that the percent difference between 5 and 7 is 33.333- percent', () => {
    priceChecker = new PriceCheck();
    expect(priceChecker.absolutePercentDiff(5,7)).toBe(33.33333333333333)
});