const assert = require('assert');
const User = require('../src/user');

describe('Updating records', function() {
  this.timeout(5000);
  let Bob;
  beforeEach(done => {
    Bob = new User({
      name: 'Bob',
      likes: 0
    });
    Bob.save(() => {
      done();
    });
  });

  it('should update the bob document', done => {
    User.update({ _id: Bob.id }, { $set: { likes: 5 } }).then(() => {
      return User.findOne({ name: 'Bob' }).then(user => {
        assert(user.likes === 5);
        done();
      });
    });
  });
});
