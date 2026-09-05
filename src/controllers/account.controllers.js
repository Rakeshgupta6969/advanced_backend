const accountModel = require("../Models/account.Models");



async function createAccount(req,res){
    const user = req.user;
    const account =  await accountModel.create({
        user: user._id
    })
    
    res.status(201).json({
        message: " account is created successfully",
        account,
        user
    })
}


async function getAllAccountOfUser(req,res){
   const allAccounts = await accountModel.find({user:req.user._id});
   return res.status(200).json({
    allAccounts
   })
}

async function getAccountBalance(req,res){
    const {accountId} = req.params;

    const account = await accountModel.findOne({
        _id:accountId,
        user:req.user._id
    });

    if(!account){
        return res.status(404).json({
            message:"Account not found"
        })
    }

    const balance = await account.getBalance();

    return res.status(200).json({
        message:"your current balance is:",
        accountId:account._id,
        balance:balance
    });


}


module.exports = {createAccount,getAllAccountOfUser,getAccountBalance};