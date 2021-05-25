require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("./database/connect");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
app.use("/static", express.static(path.join(__dirname, "static")));
require("./database/connect.js");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(bodyParser.json({ limit: "1mb", extended: true }));
const router = require("./router");
app.use(router);

const server = app.listen(8000, (err) => {
  if (!err) {
    console.log("connected");
  }
});

const wss = new WebSocket.Server({
  server,
  verifyClient: async (info) => {
    console.log(info.req.headers);
    const token = info.req.headers["sec-websocket-protocol"];
    console.log(token);
    if (!token) {
      return false;
    } else {
      try {
        const verify = jwt.verify(token, process.env.secretkey);
        console.log(verify);
        if (verify) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.lo(error);
        console.log("error");
        return false;
      }
    }
  },
});

wss.on("connection", (ws, req, client) => {
  const token = req.headers["sec-websocket-protocol"];
  const user = require("./Controllers/auth")(token);
  console.log(client);
  console.log(user);
  ws.on("message", async (data) => {
    let msg = JSON.parse(data);
    console.log(msg);
    if (msg.msg == "get") {
      console.log(msg.username, user.username);
      try {
        const result = await db.chats.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [{ user1: user.username }, { user2: msg.username }],
              },
              {
                [Op.and]: [{ user2: user.username }, { user1: msg.username }],
              },
            ],
          },
        });
        console.log(result);
        ws.send(JSON.stringify(result));
      } catch (error) {
        console.log(error);
      }
      console.log("get");
    } else {
      console.log("post");
      console.log(msg);
      const result = await db.chats.create({
        user1: user.username,
        user2: msg.username,
        sentby: user.username,
        message: msg.message,
      });
      wss.clients.forEach(async (ws) => {
        if (ws.readyState == WebSocket.OPEN) {
          const result = await db.chats.findAll({
            where: {
              [Op.or]: [
                {
                  [Op.and]: [{ user1: user.username }, { user2: msg.username }],
                },
                {
                  [Op.and]: [{ user2: user.username }, { user1: msg.username }],
                },
              ],
            },
          });
          console.log(result);
          ws.send(JSON.stringify(result));
        }
      });
    }
  });
});
