const router = require("express").Router();
const Post = require("../models/Post");
const Message = require("../models/Message");
const { protect } = require("../middleware/authMiddleware")

//create a message
router.post("/", protect, async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a message
router.put("/:id", protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    // user can only update his own message
    if (message.userId === req.body.userId) {
      await message.updateOne({ $set: req.body });
      res.status(200).json("the message has been updated");
    } else {
      res.status(403).json("you can update only your message");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a message
router.delete("/:id",protect , async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    // user can only update his own message
    if (message.userId === req.body.userId) {
      await message.deleteOne();
      res.status(200).json("the message has been deleted");
    } else {
      res.status(403).json("you can delete only your message");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a message
router.get("/:id", protect, async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//get post's messages
router.get("/post/:postId", protect,  async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    // get last messages first
    const messages = await (await Message.find({ postId: post._id }).sort("createdAt")).reverse();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});










module.exports = router;