const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      defaul: ' ', 
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

  
  const User = mongoose.model("User", UserSchema);
  
  module.exports = User;