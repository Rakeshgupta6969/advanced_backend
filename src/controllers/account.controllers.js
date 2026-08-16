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

module.exports = {createAccount};