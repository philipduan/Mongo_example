const mongoose = require('mongoose');

//We want to be alble to use Promises
mongoose.Promise = global.Promise; // ES6 implementation of Promuses that NodeJS provides to us

//Before every test that is run, we will execute the block inside, and this is only happens ONCE, (before comes from Mocha)
before(done => {
  //Connects to our mongoDB either local or hosted (heroku)
  //'users_test' is arbitrary it is the name of the DB
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {
      done(); //We're connected and ready to go
    })
    .on('error', err => {
      console.warn('Error', err);
    });
});

beforeEach(done => {
  //beforeEach is BEFORE each TEST
  //Before each test execution, we want a clean slate so we are going
  //to drop users, comments and blodposts collections each time
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    // drop === empty the collection
    comments.drop(() => {
      blogposts.drop(() => {
        done(); // Once our collections are dropped, done() is called
        //which tells mocha that we are ready to start the tests
      });
      //Ready to run test
    });
  });
  //mongoose automatically lowercases and adds an S to our collections for us
});
