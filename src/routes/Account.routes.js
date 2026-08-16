const express = require("express");

const MiddleWare = require("../Middleware/auth.middleware");
const accountController = require("../controllers/account.controllers");



const router = express.Router();


/**
 * create account 
 * post : "/api/accounts/createAccount" 
 * protected routes
 */


router.post("/createAccount",MiddleWare.authMiddleware,accountController.createAccount);



module.exports = router;