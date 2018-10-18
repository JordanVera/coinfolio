const mongoose = require('mongoose'),
      coinOwned = require('./coinOwned'),
      Schema   = mongoose.Schema;

const userSchema = new Schema({
    uid: { type: String, required: true },
    portfolio:[coinOwned]
})

const User = mongoose.model("User", userSchema)
module.exports = User;