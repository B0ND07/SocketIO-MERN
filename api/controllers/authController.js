import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid creds" });
    }
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error In Register", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password doesn't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyPic : girlPic,
    });
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error In Register", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {}
};
