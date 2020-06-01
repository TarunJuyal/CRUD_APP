const express = require("express");
const customerSchema = require("../models/customerschema");
const customerRoutes = express.Router();

customerRoutes.post("/login", (req, res) => {
  //   console.log(req.body);
  customerSchema.findOne(
    { customerName: req.body.userName, password: req.body.password },
    (err, response) => {
      if (err) throw err;
      if (response) {
        // console.log("User Found" + response.customerName);
        res.send(`<h1>Welcome ${response.customerName}</h1>
        <a href="update.html"><button>Update details</button></a>
      <a href="delete.html"><button>Delete account</button></a>`);
      } else {
        res.send("<h1>No Such User</h1>");
      }
    }
  );
});

customerRoutes.post("/register", (req, res) => {
  //   console.log(req.body);
  let customer = new customerSchema({
    customerName: req.body.userName,
    password: req.body.password,
    emailId: req.body.emailId,
  });
  let error = customer.validateSync();
  if (!error) {
    customer.save((err, result) => {
      if (err) throw err;
      if (result) {
        // console.log(result);
        // console.log("registered succesfully" + result.customerName);
        res.send(
          "<h1>Registration successfull go back to login to continue</h1>"
        );
      } else {
        // console.log(result);
        res.send("<h1>Error while registration</h1>");
      }
    });
  } else {
    res.send(error.errors["customerName"].message);
  }
});

customerRoutes.post("/update", (req, res) => {
  //   console.log(req.body);
  customerSchema.findOneAndUpdate(
    { emailId: req.body.emailId },
    { $set: { customerName: req.body.userName, password: req.body.password } },
    (err, result) => {
      if (err) throw err;
      if (result) {
        // console.log("user updated" + result.customerName);
        res.send(`<h1>Your details are updated login again</h1>`);
      } else {
        // console.log(result);
        res.send(`<h1>Error while updation</h1>`);
      }
    }
  );
});

customerRoutes.post("/delete", (req, res) => {
  //   console.log(req.body);
  customerSchema.findOneAndDelete(
    { emailId: req.body.emailId },
    (err, result) => {
      if (err) throw err;
      if (result) {
        // console.log("user deleted" + result.customerName);
        res.send(`<h1>Your account is deleted</h1>`);
      } else {
        // console.log(result);
        res.send(`<h1>Error while deletion</h1>`);
      }
    }
  );
});

module.exports = customerRoutes;
