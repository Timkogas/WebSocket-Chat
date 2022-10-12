const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users");
const messages = require("./routes/messages");
const app = express();
const enableWs = require("express-ws");
const User = require("./models/User");
enableWs(app)

const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/messages", messages);

const activeConnections = {}

app.ws('/chat', async (ws, req)=> {

  let query
  let user
  
  if (req.query.token) {
    query = req.query.token
    user = await User.findOne({token: query})

    activeConnections[user.username] = ws

    Object.keys(activeConnections).forEach(connId=>{
      const conn = activeConnections[connId]
      conn.send(JSON.stringify({
        type: "NEW_ONLINE_USER",
        users: Object.keys(activeConnections)
      }))
    })
  }

  ws.on('message', (message) => {
    const decodedMessage = JSON.parse(message)

    switch(decodedMessage.type) {
      case "MESSAGE_CREATED": 
        if (user) {
          Object.keys(activeConnections).forEach(connId=>{
            const conn = activeConnections[connId]
            conn.send(JSON.stringify({
              type: "NEW_MESSAGE",
              message: {
                username: user.username,
                text: decodedMessage.message
              }
            }))
          })
        } else {
          ws.send('Login')
        }
      default:
        console.log('Unknown message type ' + decodedMessage.type)
        break;
    }
  })

  ws.on('close', (msg)=>{
    delete activeConnections[user.username]
    Object.keys(activeConnections).forEach(connId=>{
      const conn = activeConnections[connId]
      conn.send(JSON.stringify({
        type: "NEW_ONLINE_USER",
        users: Object.keys(activeConnections)
      }))
    })
  })
})


const run = async () => {
  await mongoose.connect('mongodb://localhost/chatApp', {useNewUrlParser: true});
  console.log("Connected to mongo DB");
  app.listen(port, () => {
    console.log(
      `Server started at http://localhost:${port}`
    );
  });
  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.log);




