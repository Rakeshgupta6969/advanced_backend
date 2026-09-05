
const express = require("express");

const middlerWare = require("../Middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");


const transactionRoutes = express.Router();


/**
 * post: /api/transaction/
 * create new transaction
 */
transactionRoutes.post("/",middlerWare.authMiddleware,transactionController.createTransaction);


/**
 * post:/api/transaction/system/initial_funds
 * create initial funds transaction from system user.
 */

transactionRoutes.post("/system/initial_funds",middlerWare.authSystemUserMiddleware,transactionController.createInitialFundsTransactionViaSystemUser);

module.exports = transactionRoutes;