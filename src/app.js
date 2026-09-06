const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();


// require all router here
const authRouter = require("./routes/Auth.routes");
const accountRouter = require("./routes/Account.routes");
const transactionRouter = require("./routes/transaction.routes");


app.use(express.json());
app.use(cookieParser());
 
app.get("/",(req,res) =>{
    res.send("backend Ledger service is up and running");
})

app.use("/api/auth",authRouter);
app.use("/api/accounts",accountRouter);
app.use("/api/transaction",transactionRouter);




module.exports = app;