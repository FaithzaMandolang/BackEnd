const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("Connected");
  } catch (error) {
    console.log(err);
  }
}

main();
