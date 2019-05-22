
module.exports = {
  /**
   * Create a new transaction
   * @param {string} sender The party sending amount
   * @param {string} receiver The party receiving amount
   * @param {number} amount The amount to be sent
   */
  createTransaction(sender, receiver, amount) {
    return {
      sender,
      receiver,
      amount,
    };
  },
};
