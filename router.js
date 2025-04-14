const express = require("express");
const users = require("./users");
const routers = express.Router();
const path = require("path");
const client = require("./mongodb");

//Middleware untuk file upload
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public" });

//Routing

//login
routers.get("/login", (req, res) => {
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

//upload file
routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "/public/", file.originalname);
    fs.renameSync(file.path, target);
    res.send("file berhasil diupload");
  } else {
    res.send("file gagal diupload");
  }
});

//download file tanpa path
routers.get("/download", (req, res) => {
  const filename = "logo.png";
  res.sendFile(__dirname + "/download/" + filename);
});

routers.put("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    data: {
      username: username,
      password: password,
    },
  });
});

//get user seluruh data
// routers.get("/users", (req, res) =>
//   res.status(200).json({
//     users,
//   })
// );

routers.get("/users", async (req, res) => {
  try {
    const db = client.db("test");
    const users = await db.collection("users").find().toArray();
    res.json({
      status: "success",
      message: "list users",
      data: users,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

//get user berdasarkan nama
// routers.get("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();
//   const user = users.find((data) => data.name.toLowerCase() === name);

//   if (!user) {
//     return res.status(404).json({
//       message: "Data user tidak ditemukan",
//     });
//   }

//   res.status(200).json({ user });
// });

// routers.post("/users", (req, res) => {
//   const { name, id } = req.body;

//   if (!name || !id) {
//     return res.status(400).json({ error: "Masukan data yang akan diubah" });
//   }

//   const newUser = { id, name };
//   res.status(201).json({
//     message: "User successfully created",
//     user: newUser,
//   });
// });

// routers.put("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();
//   const { newName } = req.body;

//   if (!newName) {
//     return res.status(400).json({
//       error: "Harus memasukkan setidaknya satu data untuk diperbarui",
//     });
//   }

//   // cari user
//   const userIndex = users.findIndex((data) => data.name.toLowerCase() === name);

//   // user tidak ditemukan
//   if (userIndex === -1) {
//     return res.status(404).json({ error: "Data user tidak ditemukan" });
//   }

//   // edit data user
//   if (newName) users[userIndex].name = newName;

//   res.status(200).json({
//     message: "User berhasil diperbarui",
//     user: users[userIndex],
//   });
// });

// routers.delete("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();

//   const userIndex = users.findIndex((user) => user.name.toLowerCase() === name);

//   if (userIndex === -1) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Hapus user dari array
//   const deletedUser = users.splice(userIndex, 1);

//   res.status(200).json({
//     message: "User successfully deleted",
//     deletedUser: deletedUser[0],
//   });
//});

module.exports = routers;
