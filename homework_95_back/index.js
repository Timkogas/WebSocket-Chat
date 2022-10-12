const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users");
const app = express();
const enableWs = require("express-ws")
enableWs(app)

const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", users);

const activeConnections = {}

app.ws('/chat', (ws, req)=> {
  const id = nanoid()
  activeConnections[id] = ws

  ws.on('close', (msg)=>{
    delete activeConnections[id]
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




