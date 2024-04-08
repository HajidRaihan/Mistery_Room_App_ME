const express = require("express");
const app = express();
const Pusher = require("pusher");

app.use(express.json());

app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

// This is a simple echo server that
const pusher = new Pusher({
  appId: "1781855",
  key: "c6c692271659e31aa5f6",
  secret: "ef81bf2a91c25ce0b586",
  cluster: "ap1",
});

app.get("/api/:box/:kolom", (req, res) => {
  const { kolom, box } = req.params;
  const { pass } = req.query;
  console.log(kolom, box);
  res.send(kolom);
  pusher.trigger("me-channel", "math-event", {
    kolom,
    box,
    pass,
  });
});

app.get("/api/:box", (req, res) => {
  const { box } = req.params;
  const { pass } = req.query;
  // console.log(kolom, box);
  console.log("pass", pass);
  try {
    pusher.trigger("me-channel", "math-event", {
      box,
      pass,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
