const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      user_name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json({
      message: "User successfully registered",
      user: {
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error?.MongoServerError);
    res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name: user_name });
    console.log(user);
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      if (validate) {
        // generate jwt
        const { _id, user_name } = user._doc;
        var access_token = jwt.sign(
          { user_id: _id, user_name },
          process.env.jwt_secret_key
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, access_token });
      } else {
        res.status(400).json("wrong credential");
      }
    } else {
      res.status(400).json("wrong user name //");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
