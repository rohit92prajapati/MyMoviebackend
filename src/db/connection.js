const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/mymovies")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Error:" + err));
