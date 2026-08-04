const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  username: { 
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  role: { 
    type: String,
    enum: ['STUDENT', 'CLUB_LEADER', 'ADMIN'], 
    default: 'STUDENT'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

// Generate Token
UserSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin, role: this.role }, process.env.JWT_SECRET_KEY);
}

const User = mongoose.model("User", UserSchema);

// Validate Register User
function vaidateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: passwordComplexity().required(),
    role: Joi.string().valid('STUDENT', 'CLUB_LEADER').optional()
  })
  return schema.validate(obj);
}

// Validate Login User
function vaidateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required(),
    password: passwordComplexity().required(),
  })
  return schema.validate(obj);
}

module.exports = {
  User,
  vaidateRegisterUser,
  vaidateLoginUser
}