const mongoose = require("mongoose");

var db = mongoose.connect(
  "mongodb://localhost:27017/crudoperations",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
  },
  (err, db) => {
    if (err) {
      console.log("cant connect to database", err);
    } else {
      console.log("connected to database...");
    }
  }
);

module.exports = mongoose;
