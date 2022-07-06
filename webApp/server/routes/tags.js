const router = require("express").Router();
const Tag = require("../models/Tag");
const User = require("../models/User");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware")




//create a tag
router.post("/", protect, async (req, res) => {

    const tag = await Tag.findOne({name : req.body.name});

    if(tag){
        res.status(400).json("Tag already exits") 
    }else{
        try {
            const newTag = new Tag({
              name: req.body.name,
            });
      
        
            const tag = await newTag.save();
            res.status(200).json({tag 
            })
        
          } catch (err) {
            res.status(500).json(err)
          }
    }
  });


//get a tag
router.get("/get/:name", protect, async (req, res) => {

    const tagName = req.params.name;

    //get tag
    try {
      const tag = await Tag.findOne({name : tagName}); 
      res.status(200).json([tag]);

    } catch (err) {

      res.status(500).json(err);
    }
  });

//get two tags
router.get("/get/:name1/:name2", protect, async (req, res) => {

  const tagName1 = req.params.name1;
  const tagName2 = req.params.name2;


  try {
    var tags = [];
    const tag1 = await Tag.findOne({name : tagName1}); 
    const tag2 = await Tag.findOne({name : tagName2});
    tags.push(tag1)
    tags.push(tag2)
    res.status(200).json(tags);

  } catch (err) {

    res.status(500).json(err);
  }
});

//get three tags
router.get("/get/:name1/:name2/:name3", protect, async (req, res) => {

  const tagName1 = req.params.name1;
  const tagName2 = req.params.name2;
  const tagName3 = req.params.name3;

  try {
    var tags = [];
    const tag1 = await Tag.findOne({name : tagName1}); 
    const tag2 = await Tag.findOne({name : tagName2});
    const tag3 = await Tag.findOne({name : tagName3});
    tags.push(tag1)
    tags.push(tag2)
    tags.push(tag3)
    res.status(200).json(tags);

  } catch (err) {

    res.status(500).json(err);
  }
});

//delete tag 
router.delete("/:id",protect, async (req, res) => {
   
    try {
    await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json("Tag has been deleted");
    } catch (err) {
    return res.status(500).json(err);
    }

  });

//update tag 
router.put("/:id",protect, async (req, res) => {
  

    try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, {
    $set: req.body,
    });
    res.status(200).json("Account has been updated");
    } catch (err) {
    return res.status(500).json(err);
    }
  });


//get top 10/100 tags
router.get("/trend/:number", protect, async (req, res) => {

    try {
      const tags = await Tag.find({}).sort('createdAt').limit(req.params.number)
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//add tag to people 
router.put("/addtopeople/:name",protect, async (req, res) => {
    const tag = await Tag.findOne({name : req.params.name});
    const user = await User.findById(req.body.userId);
    
    if(tag){
        try {      
        if (!tag.peoples.includes(req.body.userId)) {
            await tag.updateOne({ $push: { peoples: req.body.userId } });
            await user.updateOne({ $push: { tags: req.params.name } });
            res.status(200).json("The tag has been added");
        } else {
            res.status(403).json("people already tagged");
            }
        } catch (err) {
        res.status(500).json(err);
        }
    }
    else{
        const newTag = new Tag({
            name: req.params.name,
          });     
        const tag = await newTag.save();
        try {      
            await tag.updateOne({ $push: { peoples: req.body.userId } });
            await user.updateOne({ $push: { tags: req.params.name } });
            res.status(200).json("The tag has been added");
        } catch (err) {
        res.status(500).json(err);
        }
    }
  });

//remove tag to people
router.put("/removetopeople/:name",protect, async (req, res) => {
    try {
      const tag = await Tag.findOne({name : req.params.name});
      const user = await User.findById(req.body.userId);
      if (tag.peoples.includes(req.body.userId)) {
        await tag.updateOne({ $pull: { peoples: req.body.userId } });
        await user.updateOne({ $pull: { tags: req.params.name } });
        res.status(200).json("The tag has been removed");
      }else {
        res.status(403).json("people not tagged");
        }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//add tag to a post

router.put("/addtopost/:name",protect, async (req, res) => {
  const tag = await Tag.findOne({name : req.params.name});
  const post = await Post.findById(req.body.postId);
  console.log(req.body.postId)
  
  if(tag){
      try {      
      if (!tag.posts.includes(req.body.postId)) {
          await tag.updateOne({ $push: { posts: req.body.postId } });
          await post.updateOne({ $push: { tags: req.params.name } });
          res.status(200).json("The tag has been added");
      } else {
          res.status(403).json("post already tagged");
          }
      } catch (err) {
      res.status(500).json(err);
      }
  }
  else{
      const newTag = new Tag({
          name: req.params.name,
        });     
      const tag = await newTag.save();
      try {      
          await tag.updateOne({ $push: { posts: req.body.postId } });
          await post.updateOne({ $push: { tags: req.params.name } });
          res.status(200).json("The tag has been added");
      } catch (err) {
      res.status(500).json(err);
      }
  }
});

//remove tag to a post

router.put("/removetopost/:name",protect, async (req, res) => {
  try {
    const tag = await Tag.findOne({name : req.params.name});
    const post = await Post.findById(req.body.postId);
    if (tag.posts.includes(req.body.postId)) {
      await tag.updateOne({ $pull: { posts: req.body.postId } });
      await post.updateOne({ $pull: { tags: req.params.name } });
      res.status(200).json("The tag has been removed");
    }else {
      res.status(403).json("post not tagged");
      }
  } catch (err) {
    res.status(500).json(err);
  }
});


//get all users with a tag 
router.get("/users/:id", protect,  async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    const users = await Promise.all(
      tag.peoples.map((userId) => {
        return User.findById(userId);
      })
    );
  res.status(200).json(users);

  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts with a tag
router.get("/posts/:id", protect,  async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    const posts = await Promise.all(
      tag.posts.map((postId) => {
        return Post.findById(postId);
      })
    );

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;

