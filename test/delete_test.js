const assert = require('assert');
const User = require('../src/user');

describe('Deleting an user', function() {
  let Bob;
  beforeEach(done => {
    Bob = new User({
      name: 'Bob'
    });
    Bob.save(() => {
      done();
    });
  });

  it('should remove the user from document', done => {
    User.remove({ name: 'Bob' }).then(() => {
      User.findOne({ name: 'Bob' }).then(user => {
        assert(user === null);
        done();
      });
    });
  });
});
