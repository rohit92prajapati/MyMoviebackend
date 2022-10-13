const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
require("./db/connection");

const router = require("./routers/signup");
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(port, () => console.log(`Connected to port on ${port}`));
