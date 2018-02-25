const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Association', function() {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'I love dogs' });
    comment = new Comment({ content: 'Congrats on the great post, WOW' });

    joe.blogPosts.push(blogPost.id);
    //Mongo will assume that we are setting up an association, so mongo will setip the objectId part for us

    blogPost.comments.push(comment.id);
    comment.user = joe.id; //Mongo will assign joe to this field and handles the Object Id for us

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it('should save a relation between a user and a blogPost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('should save a full relation tree', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: { path: 'user', model: 'user' }
        }
      })
      .then(user => {
        done();
      });
  });
});
