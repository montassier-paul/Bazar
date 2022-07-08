
const router = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { protect } = require("../middleware/authMiddleware")



//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,    
      token: generateToken(user._id),  
    })

  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if password is the same
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    
    if(validPassword){

    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  }else{
    res.status(400).json("Password is not correct")
  }

  } catch (err) {
    res.status(500).json(err)
  }
});




  // Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }


module.exports = router;
