const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 200,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

const validateUser = () => {
  const joiSchema = {
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().required(),
    age: Joi.number().min(0).max(200),
    isAdmin: Joi.boolean().required(),
  };
};

exports.User = User;
exports.validate = validateUser;
