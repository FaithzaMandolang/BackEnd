const http = require("https");
const users = require("./users");
const moment = require("moment");
const express = require("express");
const app = express();
const morgan = require("morgan");
const errorhandler = require("errorhandler");

//middleware ditulis biasanya di atas routing (request)
// const log = (req, res, next) => {
//   console.log(
//     moment().format("MMMM Do YYYY, h:mm:ss a") +
//       " " +
//       req.originalUrl +
//       " " +
//       req.ip
//   );

//   next();
// };

app.use(morgan("tiny"));
app.use(errorhandler);

//routing
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

//middleware respon/biasa untuk 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
