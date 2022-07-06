const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    peoples: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },


   
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;