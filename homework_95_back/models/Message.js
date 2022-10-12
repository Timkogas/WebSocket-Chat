const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text:  {
    type: String,
    required: [true, 'Text is required']
  },
  datetime: {
    type: Date,
  }, 
});

MessageSchema.pre("save", async function (next) {
  this.datetime = new Date()
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;