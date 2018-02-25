const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');
//All user documents under User collection should follow this schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  posts: {
    type: [PostSchema] //Sub document, an array, nested sub-doc
  },
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ]
});

//In my MongoDB, create a collection called user
//If you look in your DB, there will be a collection called 'users'
//automatically created for us
const User = mongoose.model('user', UserSchema);
//The second argument is refering to the schema it needs to follow
module.exports = User;
