const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const pusher = require("pusher");

const app = express();
const port = 7800;

const url_local = "mongodb://localhost/pusherDB";
const url =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const Push = new pusher({
  appId: "1339738",
  key: "0570e20cb7c689d942b5",
  secret: "c4ff0f08048670a63ce5",
  cluster: "eu",
  useTLS: true
});

mongoose.connect(url).then(() => {
  console.log("Connected to DB");
});

const db = mongoose.connection;

db.once("open", () => {
  const dbCollection = db.collection("chats");
  const changeStream = dbCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const triggeredView = change.fullDocument;

      Push.trigger("chat", "message", {
        username: triggeredView.username,
        message: triggeredView.message
      });
    }
  });
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200"
    ]
  })
);

app.use(express.json());

app.post("/api", async (req, res) => {
  await Push.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message
  });

  res.json([]);
});

app.post("/post", async (req, res) => {
  try {
    const { email, name } = req.body;
    await Push.trigger("peter", "my_events", {
      email,
      name
    });
    res.json([]);
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.use("/", require("./router"));

app.listen(port, () => {
  console.log("server is ready!");
});

// const db = mongoose.connection;

// db.once("open", () => {
//   const myData = db.collection("dataModels");
//   const changeStream = myData.watch();
//   changeStream.on("change", (change) => {
//     if (change.operationType === "insert") {
//       const reviewData = change.fullDocument;

//       Push.trigger("channel_name", "my_event", {
//         name: reviewData.name,
//         email: reviewData.email
//       });
//     }
//   });
// });
