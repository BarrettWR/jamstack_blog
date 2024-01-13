const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: String, required: true, minLength: 1, maxLength: 40 },
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true, minLength: 1, maxLength: 5000 },
  time: { type: Date, required: true },
  published: { type: Boolean, required: true },
  comments: [{ type: Schema.ObjectId, ref: "Comment" }]
});

// Virtual for Comments URL
PostSchema.virtual("pageurl").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/post/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", PostSchema);