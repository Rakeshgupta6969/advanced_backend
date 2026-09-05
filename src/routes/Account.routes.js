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



/**
 * fetch all accounts of a specific user.
 * get: "/api/accounts/getAllAccounts"
 */
router.get("/getAllAccounts",MiddleWare.authMiddleware,accountController.getAllAccountOfUser);


/**
 * get account Balance of a specific user.
 * get:"/api/accounts/currBalance"
 */

router.get("/currBalance/:accountId",MiddleWare.authMiddleware,accountController.getAccountBalance);


module.exports = router;