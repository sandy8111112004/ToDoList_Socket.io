let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ToDoSchema = new Schema({
  newInput:{
    type: String,
    trim: true,
    required: "Please enter a to-do Entry"
  },
  inputBox:{
    type: Boolean
  }
});

let ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
