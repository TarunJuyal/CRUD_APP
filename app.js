const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", customerRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
