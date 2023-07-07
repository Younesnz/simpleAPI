require("dotenv").config();
const express = require("express");
const app = express();
const debug = require("debug")("app:server");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initialize DB
require("./db")();

const userRoute = require("./Routes/User.route");
app.use("/users/", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debug(`Server started on port ${PORT}`);
});
