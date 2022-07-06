const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 100,
    },
    tags: {
        type: Array,
        default: [],
      }, 
    links: {
        type: Array,
        default: [],
    },
    clothesPosition: {
      type: Array,
      default: [],
  },
    image: {
      type: String,
      default: "", 
      required:true
    },
    likes: {
      type: Array,
      default: [],
    },

  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
  
module.exports = Post;