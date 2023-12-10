const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;



exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Error Signing Up: " + error.message });
  }
};

//GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get Users: " + error.message });
  }
};

//userInfo
exports.getUserInfo = async (req, res) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token)
      return res.status(201).send({ auth: false, token: "No Token Provided" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
      if (err)
        return res.status(201).send({ auth: false, token: "Invalid Token" });

      const user = await User.findById(data.userId);
      res.send(user);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
};

//get login

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const email = "";
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, username }, SECRET_KEY, {
      expiresIn: "1hr",
    });
    // res.status(200).json({message: 'Login successful'});
    res.status(200).json({ token, data: user.email });
  } catch (error) {
    res.status(500).json({ error: "Login error: " + error.message });
  }
};


