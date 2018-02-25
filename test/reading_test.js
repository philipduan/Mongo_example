const assert = require('assert');
const User = require('../src/user');

describe('Reading our records from the db', function() {
  this.timeout(5000);
  let Bob;
  let Cat;
  let Dog;
  let Elephant;

  beforeEach(done => {
    Bob = new User({ name: 'Bob' });
    Cat = new User({ name: 'Cat' });
    Dog = new User({ name: 'Dog' });
    Elephant = new User({ name: 'Elephant' });

    Promise.all([Bob.save(), Cat.save(), Dog.save(), Elephant.save()])
      .then(() => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  it('depends all users with the name of Bob', done => {
    User.find({ name: 'Bob' })
      .then(users => {
        assert(users[0].id.toString() === Bob.id.toString());
        done();
      })
      .catch(err => {
        done();
      });
  });

  it('finds a user with a particular id', done => {
    User.findOne({ _id: Bob.id }).then(user => {
      assert(user.name === 'Bob');
      done();
    });
  });

  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ name: 1 }) // 1 = ascending, -1 = descending
      .skip(1) // will skip the first document
      .limit(3) // will return only 3 document total
      .then(users => {
        assert(users.length === 3);
        assert(users[0].name === 'Cat');
        done();
      });
  });
});
