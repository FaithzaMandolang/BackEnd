const express = require("express");
const users = require("./users");
const routers = express.Router();
const path = require("path");

//Routing
//download file tanpa path
// routers.get("/download", (req, res) => {
//   const filename = "logo.png";
//   res.sendFile(__dirname + "/download/" + filename);
// });

//pakai path
// routers.get("/download", (req, res) => {
//   const filename = "logo.png";
//   res.sendFile(path.join(__dirname, "/download/", filename));
// });

//otomatis dwd
//cara1
// routers.get("/download", (req, res) => {
//   const filename = "logo.png";
//   res.sendFile(path.join(__dirname, "/download/", filename), {
//     headers: {
//       "Content-Disposition": 'attachment; filename="dwd-logo.png"',
//     },
//   });
// });

//cara2
// routers.get("/download", (req, res) => {
//   const filename = "logo.png";
//   res.download(path.join(__dirname, "/download/", filename), "logo-dwd.png");
// });

routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    data: {
      username: username,
      password: password,
    },
  });
});

routers.get("/", (req, res) => res.send("this is homepage"));

//get user seluruh data
routers.get("/users", (req, res) =>
  res.status(200).json({
    users,
  })
);

//get user berdasarkan nama
routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((data) => data.name.toLowerCase() === name);

  if (!user) {
    return res.status(404).json({
      message: "Data user tidak ditemukan",
    });
  }

  res.status(200).json({ user });
});

module.exports = routers;
