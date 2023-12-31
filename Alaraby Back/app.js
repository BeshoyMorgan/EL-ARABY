//npm init
// npm i express
const express = require("express"); //1
const app = express(); //2
// var bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// var morgan = require("morgan");
// const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");
const adminRoute = require("./routes/admin");
const usersRoutes = require("./routes/users");

//middleware
mongoose.connect(
  "mongodb+srv://beshoy:123456b@cluster0.ugalqup.mongodb.net/Alaraby",
  () => {
    console.log("Connected to Mongo db");
  }
);
//3
app.use(express.json());

app.use(
  cors({
    // that is mean only this domain has permission to access on this api 'www.iti.com'
    // origin:'www.iti.com'
  })
);

app.use("/products", productsRoute);
// app.use("/Category", categoriesRoute);
app.use("/admin", adminRoute);
app.use("/users", usersRoutes);

//not found middleware
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "not found path" });
});

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "server error" });
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
