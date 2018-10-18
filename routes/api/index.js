const express = require('express');
const router = require("express").Router();
const app = express();
const userRoutes = require("./users");

// user routes
router.use("/users", userRoutes);


module.exports = router;