const express = require("express");
const users = require("./users");
const routers = express.Router();
const path = require("path");
const client = require("./mongodb");
const ObjectId = require("mongodb").ObjectId;

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
// routers.post("/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   if (file) {
//     const target = path.join(__dirname, "/public/", file.originalname);
//     fs.renameSync(file.path, target);
//     res.send("file berhasil diupload");
//   } else {
//     res.send("file gagal diupload");
//   }
// });

//download file tanpa path
// routers.get("/download", (req, res) => {
//   const filename = "logo.png";
//   res.sendFile(__dirname + "/download/" + filename);
// });

//ambil semua data users
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

//ambil data users berdasarkan id
routers.get("/users/:id", async (req, res) => {
  try {
    const db = client.db("test");
    const user = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json({
      status: "success",
      message: "single users",
      data: user,
    });
  } catch (error) {}
});

//insert user
routers.post("/users", async (req, res) => {
  try {
    const db = client.db("test");
    const user = await db.collection("users").insertOne(req.body);
    res.json({
      status: "success",
      message: "user created",
      data: user,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

//update user
routers.put("/users/:id", async (req, res) => {
  try {
    const db = client.db("test");
    const updatedUser = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the user",
    });
  }
});

//delete user
routers.delete("/users/:id", async (req, res) => {
  try {
    const db = client.db("test");
    const deletedUser = await db.collection("users").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the user",
    });
  }
});

//get order user (join/aggrigate)
routers.get("/users-orders", async (req, res) => {
  try {
    const db = client.db("test");
    const users = await db
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "Order",
            localField: "_id",
            foreignField: "user_id",
            as: "orders",
          },
        },
      ])
      .toArray();
    res.json({
      status: "success",
      message: "list users with orders",
      data: users,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

module.exports = routers;
