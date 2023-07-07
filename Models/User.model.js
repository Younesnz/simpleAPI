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

const validateUser = (user, isRequired = true) => {
  let joiSchema = Joi.object({
    username: Joi.string().min(5).max(50),
    password: Joi.string(),
    age: Joi.number().integer().min(0).max(200),
    isAdmin: Joi.boolean(),
  });
  if (isRequired)
    joiSchema = joiSchema.fork(["username", "password", "isAdmin"], (field) =>
      field.required()
    );
  return joiSchema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
