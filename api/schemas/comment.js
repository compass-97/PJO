const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    text: { type: String, required: true },
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
