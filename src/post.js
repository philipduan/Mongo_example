const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String
});
//I did not create a post collection as the other files because
//This is a SUB DOCUMENT it is NESTED DOCUMENT within another doc

module.exports = PostSchema;
