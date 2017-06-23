import mongoose from 'mongoose';

var memorySchema = mongoose.Schema({
  _user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  location: String,
  description: String,
  filename: String
});


module.exports = mongoose.model('Memory', memorySchema);
