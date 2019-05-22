const Blockchain = require('./blockchain');
const { createTransaction } = require('./transaction');

const txn = createTransaction('alice', 'bob', 100);
let bc;
describe('Blockchain', () => {
  beforeEach(() => {
    bc = new Blockchain();
  });

  describe('#newBlock', () => {
    // Mock Date.now so tests can be deterministic
    Date.now = jest.fn(() => 123456789);
    it('should require a proof number', () => expect(() => bc.newBlock()).toThrow());

    [
      { prop: 'index', expected: 1 },
      { prop: 'timestamp', expected: 123456789 },
      { prop: 'transactions ', expected: undefined },
      { prop: 'proof', expected: 4 },
      { prop: 'previousHash', expected: 987654321 },
    ].forEach(({ prop, expected }) => it(`should have prop ${prop}`, () => expect(bc.newBlock(4, 987654321).get(prop)).toEqual(expected)));

    it('should add the block to the chain', () => {
      bc.newBlock(4);
      expect(bc.chain).toHaveLength(1);
    });

    it('should have a null previous hash if there is nothing in the chain', () => {
      expect(bc.newBlock(4).get('previousHash')).toBeNull();
    });

    it('should clear out transactions after creating a block', () => {
      bc.addTransaction(txn);
      bc.newBlock(4);
      expect(bc.currentTransactions).toHaveLength(0);
    });
  });

  describe('#addTransaction', () => {
    it('should add a transaction to the currentTransactions list', () => {
      bc.addTransaction(txn);
      expect(bc.currentTransactions).toHaveLength(1);
    });

    it('should return the index of the block this transaction will be in', () => {
      expect(bc.addTransaction(txn)).toEqual(1);
      bc.newBlock(4);
      expect(bc.addTransaction(txn)).toEqual(2);
    });
  });
});
