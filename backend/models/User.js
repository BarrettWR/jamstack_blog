const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 1, maxLength: 40 },
  password: { type: String, required: true, minLength: 1 },
  admin: { type: Boolean, required: true },
});

// Virtual for Comments URL
UserSchema.virtual("pageurl").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);