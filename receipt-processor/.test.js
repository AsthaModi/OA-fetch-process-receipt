const { countAlphanumeric, receiptPoints } = require('./yourModule'); // Replace 'yourModule' with the actual module name

describe('countAlphanumeric', () => {
  const tests = [
    { testName: 'Simple string', testVal: 'shouldbefine', wantCount: 12 },
    { testName: 'Ignore whitespace and periods', testVal: 'This is a\n test.', wantCount: 11 },
    { testName: 'Handle extended characters', testVal: '日本語', wantCount: 0 },
  ];

  tests.forEach(({ testName, testVal, wantCount }) => {
    test(testName, () => {
      const got = countAlphanumeric(testVal);
      expect(got).toEqual(wantCount);
    });
  });
});

describe('receiptPoints', () => {
  test('First test case', () => {
    const firstTestJSON = `{
      "retailer": "Target",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:01",
      "items": [
        { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
        { "shortDescription": "Emils Cheese Pizza", "price": "12.25" },
        { "shortDescription": "Knorr Creamy Chicken", "price": "1.26" },
        { "shortDescription": "Doritos Nacho Cheese", "price": "3.35" },
        { "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ", "price": "12.00" }
      ],
      "total": "35.35"
    }`;
    const testReceipt = JSON.parse(firstTestJSON);
    const want = 28;
    const got = receiptPoints(testReceipt);
    expect(got).toEqual(want);
  });

  test('Second test case', () => {
    const secondTestJSON = `{
      "retailer": "M&M Corner Market",
      "purchaseDate": "2022-03-20",
      "purchaseTime": "14:33",
      "items": [
        { "shortDescription": "Gatorade", "price": "2.25" },
        { "shortDescription": "Gatorade", "price": "2.25" },
        { "shortDescription": "Gatorade", "price": "2.25" },
        { "shortDescription": "Gatorade", "price": "2.25" }
      ],
      "total": "9.00"
    }`;
    const testReceipt = JSON.parse(secondTestJSON);
    const want = 109;
    const got = receiptPoints(testReceipt);
    expect(got).toEqual(want);
  });
});