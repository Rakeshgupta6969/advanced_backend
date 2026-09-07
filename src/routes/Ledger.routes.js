const express = require("express");
const middleware = require("../Middleware/auth.middleware");
const ledgerController = require("../controllers/Ledger.controllers");

const LedgerRouter = express.Router();



/**
 * get:/api/ledger/fetchLedger/accountId
 * fetch all the ledger entry associated with a particular account.
 */

LedgerRouter.get("/accountId",middleware.authSystemUserMiddleware,ledgerController.fetchLedgerEntry);

module.exports = LedgerRouter;