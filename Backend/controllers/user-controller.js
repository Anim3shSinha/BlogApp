import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users; //new array of user
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "NO user found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  //destructing new user name etc. from the user
  const { name, email, password } = req.body;

  //checking existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "user is already available" });
  }

  //hasing password
  const hashPassword = bcrypt.hashSync(password);

  //adding new user to the user array
  const user = new User({
    name,
    email,
    password: hashPassword,
    blogs: [],
  });

  try {
    await user.save(); //.save function to save the user in mongodb
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //checking existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "user not found with this email" });
  }

  //checking password from login matches the signup password
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "user not authorized" });
  }
  return res
    .status(200)
    .json({ message: "Login successful", user: existingUser });
};
