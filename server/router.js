const express = require("express");
const Model = require("./model");
const router = express.Router();
const pusher = require("pusher");

const Push = new pusher({
  app_id: "1339738",
  key: "0570e20cb7c689d942b5",
  secret: "c4ff0f08048670a63ce5",
  cluster: "eu"
});

router.get("/", async (req, res) => {
  const getData = await Model.find();

  res.status(200).json({ message: "found", data: getData });
});

router.get("/:id", async (req, res) => {
  try {
    const getData = await Model.findById(req.body);

    res.status(200).json({ message: "found", data: getData });
  } catch (err) {
    console.log("Already used");
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, message } = req.body;
    const getData = await Model.create({
      username,
      message
    }).then((data) => {
      Push.trigger("chat", "message", {
        username,
        message
      });
    });

    // await Push.trigger("channel", "my_event", {
    //   username,
    //   message
    // });

    res.status(200).json({ message: "created", data: getData });
  } catch (err) {
    res.json({ message: err.message });
    console.log("Already used");
  }
});

module.exports = router;
