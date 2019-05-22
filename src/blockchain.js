const hash = require('./hash');

/**
 * getHash
 * @param {string} previousHash Optional hash string from previous block
 * @return {string|null}
 */
function getHash(previousHash) {
  if (previousHash) {
    return previousHash;
  }

  let computedHash = null;
  if (!previousHash && this.chain[-1]) {
    computedHash = hash(this.chain[-1]);
  }

  return computedHash;
}

module.exports = class Blockchain {
  constructor() {
    this.chain = [];
    this.currentTransactions = [];
  }

  newBlock(proof, previousHash) {
    if (!proof) {
      throw new Error('proof number required');
    }

    const block = new Map([
      ['index', this.chain.length + 1],
      ['timestamp', Date.now()],
      ['transactions', this.currentTransactions],
      ['proof', proof],
      ['previousHash', getHash.call(this, previousHash)],
    ]);

    this.currentTransactions = [];
    this.chain.push(block);

    return block;
  }

  addTransaction(transaction) {
    this.currentTransactions.push(transaction);
    if (this.chain.length) {
      return this.chain.length + 1;
    }
    return 1;
  }
};
