const http = require("http");
// const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const users = require("./users");
const server = http.createServer((req, res) => {
  /*call back function*/
  /*res = respon(apa yang dikirim oleh server), req=request(apa yang di minta client)*/
  res.setHeader("Content-Type", "text/json");
  // res.write(hello);
  // res.write(greetings());
  const url = req.url;
  if (url === "/") {
    res.statusCode = 200;
    res.write("This is the homepage");
  } else if (url === "/about") {
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        status: "success",
        message: "response success",
        Description: "Exercise #02",
        date: moment().format(),
      })
    );
  } else if (url === "/users") {
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        users,
      })
    );
  } else {
    res.statusCode = 404;
    res.write(
      JSON.stringify({
        status: "not found",
        message: "router tidak ditemukan",
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
    );
  }
  // res.write(moment().format("MMMM Do YYYY, h:mm:ss a"));
  res.end();
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
