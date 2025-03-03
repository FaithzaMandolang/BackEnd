const http = require("https");
//const users = require("./users");
//const moment = require("moment");
const express = require("express");
const app = express();
const routers = require("./router.js");
const morgan = require("morgan");
const path = require("path");
// const errorhandler = require("errorhandler");

app.use(morgan("tiny"));

//request body
app.use(express.urlencoded({ extended: true })); //x-www blablabla

app.use(express.json()); //raw - json

//routing
app.use(routers);

//middleware file statis
app.use(express.static(path.join(__dirname, "public")));

//middleware respon/biasa untuk 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

//penanganan error
const errorhandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};

app.use(errorhandling);

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
