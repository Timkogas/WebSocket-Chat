const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users");
const {messages, wsMessages} = require("./routes/messages");
const app = express();
const enableWs = require("express-ws");
enableWs(app)

const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/messages", messages);
app.use("/messages", wsMessages);

const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1/chatApp', {useNewUrlParser: true});
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




