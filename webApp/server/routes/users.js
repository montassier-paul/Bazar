const router = require("express").Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware")
const multer = require('multer')            
const Aws = require('aws-sdk')  
const dotenv = require("dotenv");



// Used to store image on aws 3 cloud
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
      cb(null, '')
      
  }
})


// Used to store image on aws 3 cloud, check jpeg format
const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb(null, false)
  }
}


// Used to store image on aws 3 cloud
const upload = multer({ storage: storage, fileFilter: filefilter });



//get a user
router.get("/:id", protect, async (req, res) => {

    const userId = req.params.id;

    // get user
    try {
      const user = await User.findById(userId); 

      // Only keep relevant and public data
      const { updatedAt,password,createdAt,  ...other } = user._doc;
      res.status(200).json(other);

    } catch (err) {

      res.status(500).json(err);
    }
  });

//update user
router.put("/:id",protect, async (req, res) => {

    // User can only update himself
    if (req.body.userId === req.params.id || req.body.isAdmin) {
    
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(400).json("You can update only your account!");
    }
  });

// upload coverPicture
router.put("/coverPicture/:id",protect,upload.single('coverPicture'), async (req, res) => {

  // Get id to amazon login
  const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET      // secretAccessKey is also store in .env file
  })
  
  if (req.body.userId === req.params.id || req.body.isAdmin) {

    // get current date to have single file name
    const start = Date.now();


      const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:String(start) + req.file.originalname,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read-write",                 // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    // upload image on amazon cloud
    s3.upload(params,async(error,data)=>{
      if(error){
          res.status(500).send({"err":error}) 
      }

    // data.location = location of the image on the cloud 
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
      coverPicture: data.Location,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  } else {
    return res.status(400).json("You can update only your account!");
  }
});

// upload profilePicture 
router.put("/profilePicture/:id",protect,upload.single('profilePicture'), async (req, res) => {

  // Get id to amazon login
  const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET      // secretAccessKey is also store in .env file
  })
  
  if (req.body.userId === req.params.id || req.body.isAdmin) {

    // get current date to have single file name
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
    // data.location = location of the image on the cloud 
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
      profilePicture: data.Location,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  } else {
    return res.status(400).json("You can update only your account!");
  }
});
  

// delete a user
router.delete("/:id",protect, async (req, res) => {

    // user can only delete his account
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(400).json("You can delete only your account!");
    }
  });


//follow a user
router.put("/:id/follow",protect, async (req, res) => {

    // user can't follow himself
    if (req.body.userId !== req.params.id) {
        try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
            // add current user to user followers
            await user.updateOne({ $push: { followers: req.body.userId } });
            // add user to current user followings
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
        } else {
            res.status(403).json("you allready follow this user");
        }
        } catch (err) {
        res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});
  
//unfollow a user
router.put("/:id/unfollow",protect,  async (req, res) => {
  // user can't unfollow himself
    if (req.body.userId !== req.params.id) {
        try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
            // remove current user to user followers
            await user.updateOne({ $pull: { followers: req.body.userId } });
            // remove current user to user followers
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
        } else {
            res.status(403).json("you dont follow this user");
        }
        } catch (err) {
        res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});




module.exports = router;
