const http = require("https");
//const users = require("./users");
const moment = require("moment");
const express = require("express");
const app = express();
const routers = require("./router.js");
const morgan = require("morgan");
// const errorhandler = require("errorhandler");

app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: true })); //x-www blablabla

app.use(express.json()); //raw - json

//routing
//app.get("/", (req, res) => res.send("this is homepage"));

//get user seluruh data
// app.get("/users", (req, res) =>
//   res.status(200).json({
//     users,
//   })
// );

//get user berdasarkan nama
// app.get("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();
//   const user = users.find((data) => data.name.toLowerCase() === name);

//   if (!user) {
//     return res.status(404).json({
//       message: "Data user tidak ditemukan",
//     });
//   }

//   res.status(200).json({ user });
// });

//routing
app.use(routers);

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
