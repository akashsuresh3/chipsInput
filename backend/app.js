const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const Chips = require('./models/chips');
const addChipsRoutes = require("./routes/addChips");
const getChipsRoutes = require("./routes/getChips");

mongoose
  .connect(
    "mongodb+srv://akash:chips@cluster0.6zp39.mongodb.net/nodeDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


// app.post("/api/addchips", (req,res,next) => {
//   const chips = [
//     {
//       id: "estbsetb",
//       name: "akash",
//       email: "akk@gm.com"
//     }
//   ];
//   res.status(200).json({
//     message:"successfully added",
//     chips: chips
//    });
// })

app.use("/api/addchips", addChipsRoutes);
app.use("/api/getchips", getChipsRoutes);

module.exports = app;
