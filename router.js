const express = require("express");
const users = require("./users");
const routers = express.Router();

//Routing
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
