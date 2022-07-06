const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware")
const multer = require('multer')            
const Aws = require('aws-sdk')  
const dotenv = require("dotenv");




const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
      cb(null, '')
      
  }
})

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter: filefilter });




//create a post

router.post("/", protect,upload.single('image'), async (req, res) => {

  const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET      // secretAccessKey is also store in .env file
  })

  

  const start = Date.now();


  const params = {
    Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
    Key:String(start) + req.file.originalname,               // Name of the image
    Body:req.file.buffer,                    // Body which will contain the image in buffer format
    ACL:"public-read-write",                 // defining the permissions to get the public link
    ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
};


    s3.upload(params,async(error,data)=>{
      if(error){
          res.status(500).send({"err":error}) 
      }


      console.log(data)   
      try {


        const newPost = new Post(Object.assign({image: data.Location}, req.body));

        const savedPost =  await newPost.save().then(result => {
          res.status(200).send(result)
      })
      .catch(err => {
          res.send({ message: err })
    });
      } catch (err) {
        res.status(500).json(err);
      }

})
  
  

});

//update a post
router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id",protect , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", protect, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//like / dislike a post
router.put("/:id/like", protect,  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      await user.updateOne({ $push: { likes: req.params.id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      await user.updateOne({ $pull: { likes: req.params.id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//get timeline posts
router.get("/timeline/:userId", protect,  async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get liked posts
router.get("/liked/:userId", protect,  async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const likedPosts = await Promise.all(
        currentUser.likes.map((postId) => {
          return Post.findById(postId);
        })
      );
      res.status(200).json(likedPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });



//get user's all posts
router.get("/profile/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ userId: user._id }).sort("createdAt");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;