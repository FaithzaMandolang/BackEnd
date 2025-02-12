const http = require("https");
const users = require("./users");
const moment = require("moment");
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("this is homepage"));

app.get("/users", (req, res) =>
  res.status(200).json({
    users,
  })
);

app.get("/about", (req, res) =>
  res.status(200).json({
    status: " success",
    message: "About page",
    message: "response success",
    Description: "Exercise #03",
    date: moment().format(),
  })
);

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
