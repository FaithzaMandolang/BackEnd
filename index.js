const http = require("https");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/about", (req, res) =>
  res.status(200).json({
    status: " success",
    message: "About page",
    data: [],
  })
);

app.post("/contoh", (req, res) => {
  res.send("Request dengan method post");
});

app.put("/contoh", (req, res) => {
  res.send("Request dengan method put");
});

app.delete("/contoh", (req, res) => {
  res.send("Request dengan method delete");
});

app.patch("/contoh", (req, res) => {
  res.send("Request dengan method patch");
});

app.all("/universal", (req, res) => {
  res.send(`Request dengan method ${req.method}`);
});

app.get("/news/:id", (req, res) => {
  res.send(`Artikel ke- ${req.params.id}`); //routing dinamis pake param/parameter
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
