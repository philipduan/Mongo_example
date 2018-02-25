const User = require('../src/user');
const assert = require('assert');

describe('Subdocuments', () => {
  it('Can create a subdocument', done => {
    const bob = new User({
      name: 'Bob',
      posts: [{ title: 'Post Title' }, { title: 'I love JS' }]
    });
    bob
      .save()
      .then(() => {
        return User.findOne({ _id: bob.id });
      })
      .then(user => {
        assert(user.posts.length === 2);
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  it('Can add a subdocument to an existing record', done => {
    const christo = new User({
      name: 'Christo',
      posts: []
    });
    christo
      .save()
      .then(() => {
        return User.findOne({ name: 'Christo' });
      })
      .then(user => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => {
        return User.findOne({ name: 'Christo' });
      })
      .then(user => {
        assert(user.posts.length === 1);
        assert(user.posts[0].title === 'New Post');
        assert(user.name === 'Christo');
        done();
      });
  });

  it('Can remove an existing sub-document', done => {
    let joanne = new User({
      name: 'Joanne',
      posts: [{ title: 'I am a lady' }]
    });
    joanne
      .save()
      .then(() => {
        return User.findOne({ 'posts.title': 'I am a lady' });
      })
      .then(user => {
        user.posts.pull(user.posts[0].id).remove();
        return user.save();
      })
      .then(() => {
        return User.findOne({ name: 'Joanne' });
      })
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
