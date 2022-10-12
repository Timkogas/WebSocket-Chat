const express = require("express");
const auth = require("../middleware/auth");
const Message = require("../models/Message");
const router = express.Router();

router.get("/", async (req, res) => {
  let query;

  try {
    const messages = await Message.find(query)
      .limit(30)
      .sort({datetime: -1})
    res.send(messages);
  } catch(e) {
    res.sendStatus(502);
  }
});

module.exports = router;