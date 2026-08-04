const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User, vaidateRegisterUser, vaidateLoginUser } = require("../models/User");

/**
 *  @desc    Register New User
 *  @route   /api/auth/register
 *  @method  POST
 *  @access  public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { error } = vaidateRegisterUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "This email is already registered" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    role: req.body.role || 'STUDENT'
  });

  await user.save();
  res.status(201).json({ message: "Account created successfully! You can log in now." });
});

/**
 *  @desc    Login User
 *  @route   /api/auth/login
 *  @method  POST
 *  @access  public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { error } = vaidateLoginUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMatch) return res.status(400).json({ message: "Invalid email or password" });

  const token = user.generateToken();

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    token: token
  });
});

module.exports = {
  registerUser,
  loginUser
};