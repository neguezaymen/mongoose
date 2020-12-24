const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Person", PersonSchema);
