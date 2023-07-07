const req = require("express/lib/request");
const mongoose = require("mongoose");
const debug = require("debug")("app:UserController");

const { User, validate } = require("../Models/User.model");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const result = await User.find({}, { password: 0, __v: 0 }).sort(
        "username"
      );
      res.send(result);
    } catch (err) {
      debug(`Error in getAllUsers: ${err.message}`);
    }
  },
  createNewUser: async (req, res, next) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (err) {
      debug(`Error in createNewUser: ${err}`);
      if (err.code === 11000)
        return res.status(400).send("username already exist");
      return res.status(422).send(err);
    }
  },
  getUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id, { password: 0, __v: 0 });
      if (!user) return res.status(404).send("user does not exist.");
      res.send(user);
    } catch (err) {
      debug(`Error in getUserById: ${err.message}`);
      if (err instanceof mongoose.CastError)
        return res.status(400).send("invalid user id");
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { error } = validate(req.body, false);
      if (error) return res.status(400).send(error.details[0].message);

      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) return res.status(404).send("user does not exist.");
      res.send(result);
    } catch (err) {
      debug(`Error in updateUser: ${err.message}`);
      if (err.code === 11000)
        return res.status(400).send("username already exist");
      if (err instanceof mongoose.CastError)
        return res.status(400).send("invalid user id");

      return res.status(500).send("something went wrong.");
    }
  },

  deleteUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) return res.status(404).send("user does not exist.");
      res.send(result);
    } catch (err) {
      debug(`Error in deleteUser: ${err.message}`);
      if (err instanceof mongoose.CastError)
        return res.status(400).send("invalid user id");
      return res.status(500).send("something went wrong.");
    }
  },
};
