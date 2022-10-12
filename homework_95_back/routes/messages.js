const express = require("express");
const auth = require("../middleware/auth");
const Message = require("../models/Message");
const User = require("../models/User");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.status(201).send(message);
  } catch(e) {
    res.status(400).send(e);
  }
});
router.get("/", async (req, res) => {
  let query;

  try {
    const messages = await Message.find(query)
      .sort({datetime: 1})
      .limit(30)
    res.send(messages);
  } catch(e) {
    res.sendStatus(502);
  }
});

module.exports = router;