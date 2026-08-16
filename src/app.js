const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();


// require all router here
const authRouter = require("./routes/Auth.routes");
const accountRouter = require("./routes/Account.routes");


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/accounts",accountRouter);



module.exports = app;