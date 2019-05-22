const { createTransaction } = require('./transaction');

describe('Transaction', () => {
  describe('#createTransaction', () => {
    let txn;
    beforeEach(() => {
      txn = createTransaction('alice', 'bob', 100);
    });

    [
      { prop: 'sender', expected: 'alice' },
      { prop: 'receiver', expected: 'bob' },
      { prop: 'amount', expected: 100 },
    ].forEach(({ prop, expected }) => it(`should return an object with a ${prop}`, () => expect(txn[prop]).toEqual(expected)));
  });
});
