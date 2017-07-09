import mongoose from 'mongoose';

var goalSchema = mongoose.Schema({
    _user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    achieved: Boolean,
    description: String
  },
  {timestamps: true}
);


module.exports = mongoose.model('Goal', goalSchema);
