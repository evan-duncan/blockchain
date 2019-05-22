const hash = require('./hash');

describe('Hash', () => {
  it('should returned a SHA-512 string', () => expect(hash('foo')).toMatch(/^\w{128}$/));
});
