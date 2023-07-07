const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User.controller");

router.get("/", UserController.getAllUsers);

router.post("/", UserController.createNewUser);

router.get("/:id", UserController.getUserById);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
