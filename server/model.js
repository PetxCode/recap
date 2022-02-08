const mongoose = require("mongoose");
const Model = mongoose.Schema({
  username: String,
  message: {
    type: String
    // unique: true
  }
});

module.exports = mongoose.model("chats", Model);
