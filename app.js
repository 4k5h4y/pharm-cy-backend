const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const supplierRoutes = require('./routes/supplier');
const inventoryRoutes = require('./routes/inventory');
const userRoutes = require('./routes/user');
const salesRoutes = require('./routes/sales');
const cors = require('cors');


mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database!');
  })
  .catch((err) => {
    console.log('connection failed! ', err);
  });
mongoose.set('useCreateIndex', true);

//OJx2X4IllVNl9up4

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
//     "HTTP/1.1 200 OK",
//     "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PATCH,DELETE,OPTIONS,PUT"
//   );
//   next();
// });


app.use("/api/supplier", supplierRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sales", salesRoutes);

module.exports = app;
