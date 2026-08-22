const transactionModel = require("../Models/Transaction.Models");
const ledgerModel = require("../Models/ledger.Models");
const accountModel = require("../Models/account.Models");
const emailService = require("../Services/Email.Services");


async function createTransaction(req,res){
    const {fromAccount,toAccount,amount,idemPotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount || !idemPotencyKey){
        return res.status(400).json({
            message:"fromAccount,toAccount,amount, and idemPotencyKey are required",
        });
    }
}


module.exports = {createTransaction}