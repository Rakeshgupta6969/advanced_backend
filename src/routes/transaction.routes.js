
const express = require("express");

const middlerWare = require("../Middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");


const transactionRoutes = express.Router();


/**
 * post: /api/transaction
 * create new transaction
 */
transactionRoutes.post("/",middlerWare.authMiddleware,transactionController.createTransaction);


module.exports = transactionRoutes;