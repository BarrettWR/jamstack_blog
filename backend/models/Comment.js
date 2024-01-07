const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true, minLength: 1, maxLength: 40 },
  message: { type: String, required: true, minLength: 1, maxLength: 5000 },
  time: { type: Date, required: true },
  postID: {type: Schema.ObjectId, required: true}
});

// Virtual for Comments URL
CommentSchema.virtual("pageurl").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);