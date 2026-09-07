const ledgerModel = require("../Models/ledger.Models");



async function fetchLedgerEntry(req,res){
    const {accountId} = req.body;
    if(!accountId){
        return res.status(400).json({
           message:"account is not exists" 
        })
    }

    const allLedgerEntry = await ledgerModel.find({account:accountId});
    if(!allLedgerEntry){
        return res.status(200).json({
            message:"no transaction happened"
        })
    }
   
    return res.status(200).json({
        message:"all ledger entry associated with this account",
        LedgerEntry:allLedgerEntry
    });

}


module.exports = {fetchLedgerEntry};