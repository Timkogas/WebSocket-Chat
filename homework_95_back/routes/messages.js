const express = require("express");
const auth = require("../middleware/auth");
const Message = require("../models/Message");
const router = express.Router();
const app = express();
const enableWs = require("express-ws");
const User = require("../models/User");
enableWs(app)

router.get("/", async (req, res) => {
  let query;

  try {
    const messages = await Message.find(query)
      .limit(30)
      .sort({ datetime: -1 })
    res.send(messages);
  } catch (e) {
    res.sendStatus(502);
  }
});

const activeConnections = {}

app.ws('/chat', async (ws, req) => {

  let query
  let user

  if (req.query.token) {
    query = req.query.token
    user = await User.findOne({ token: query })

    activeConnections[user.username] = ws

    Object.keys(activeConnections).forEach(connId => {
      const conn = activeConnections[connId]
      conn.send(JSON.stringify({
        type: "NEW_ONLINE_USER",
        users: Object.keys(activeConnections)
      }))
    })
  }

  ws.on('message', async (message) => {

    const decodedMessage = JSON.parse(message)

    switch (decodedMessage.type) {
      case "MESSAGE_CREATED":
        try {
          if (user) {
            const message = new Message({ text: decodedMessage.message, user: user.username });
            await message.save();
            Object.keys(activeConnections).forEach(connId => {
              const conn = activeConnections[connId]
              conn.send(JSON.stringify({
                type: "NEW_MESSAGE",
                message: {
                  user: user.username,
                  text: decodedMessage.message
                }
              }))
            })
          } else {
            ws.send('Login')
          }
        } catch (e) {

        }

      default:
        console.log('Unknown message type ' + decodedMessage.type)
        break;
    }
  })

  ws.on('close', (msg) => {
    delete activeConnections[user.username]
    Object.keys(activeConnections).forEach(connId => {
      const conn = activeConnections[connId]
      conn.send(JSON.stringify({
        type: "NEW_ONLINE_USER",
        users: Object.keys(activeConnections)
      }))
    })
  })
})

module.exports = {
  wsMessages: app,
  messages: router
};