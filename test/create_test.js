//Method that we get from Mocha called assert
//As we test we make assertions

const assert = require('assert'); //This is from Mocha
const User = require('../src/user');

describe('Create records', () => {
  it('should saves a user to my db', done => {
    const joe = new User({
      name: 'Joe'
    });
    joe.save().then(user => {
      assert(!joe.isNew);
      assert(user.name === 'Joe');
      done();
    });
  });
});
