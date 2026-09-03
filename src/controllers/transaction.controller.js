const transactionModel = require("../Models/Transaction.Models");
const ledgerModel = require("../Models/ledger.Models");
const accountModel = require("../Models/account.Models");
const emailService = require("../Services/Email.Services");
const mongoose = require("mongoose");


// javascript documentation comments.
/**
 *  create a new transaction
 *  The 10 -> steps transfer flow
 * 1. Validate request
 * 2. Validate idemPotency Key
 * 3. Check account status
 * 4. Derive sender balance from ledger
 * 5. Create Transaction in PENDING  status
 * 6. Create CREDIT ledger Entry
 * 7. Create DEBIT  ledger Entry
 * 8. Mark Transaction completed
 * 9. Commit MongoDB Session
 * 10. Send Email Notification.
 */

async function createTransaction(req,res){
    const {fromAccount,toAccount,amount,idemPotencyKey} = req.body;
     
    
/**
 * step1 : Validate request
 */

    if(!fromAccount || !toAccount || !amount || !idemPotencyKey){
        return res.status(400).json({
            message:"fromAccount,toAccount,amount, and idemPotencyKey are required",
        });
    }

    const fromUserAccount =await  accountModel.findOne({
        _id:fromAccount
    });

    const toUserAccount = await accountModel.findOne({
        _id:toAccount
    });

    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json({
            message:"fromAccount or toAccount is invalid"
        })
    }


 /**
 * step2 : Validate idemPotency Key
 */

  const isTransactionAlreadyExists = await transactionModel.findOne({
    idemPotencyKey : idemPotencyKey
  });

  if(isTransactionAlreadyExists ){
    if(isTransactionAlreadyExists.status === "COMPLETED"){
     return  res.status(200).json({
        message:"transaction is already completed",
        transaction:isTransactionAlreadyExists
     })
    }

    if(isTransactionAlreadyExists.status === "PENDING"){
       return res.status(200).json({
            message:"transaction is processing..."
        })
    }

    if(isTransactionAlreadyExists.status === "FAILED"){
        return res.status(500).json({
            message:"Your previous transaction is failed please try again"
        })
    }
    
    if(isTransactionAlreadyExists.status === "REVERSED"){
        return res.status(500).json({
            message:"Transaction is reversed, please try  again"
        })
    }
  }


  /**
   * step3 : Check account status   
   */

  if(fromUserAccount.status != 'ACTIVE' || toUserAccount.status != 'ACTIVE'){
    return res.status(400).json({
        message:"Both fromUserAccount and the toUserAccount must be in Active state to process the transaction"
    })
  }


  
  /**
   * step4 : derive sender balance from ledger.  
   */

  const balance = await fromUserAccount.getBalance();
  if(balance < amount){
    return res.status(400).json({
        message:`Insufficient Amount,current amount is ${balance}, and request amount is ${amount}`
    })
  }
   
    
  /**
   * step 5: create transaction in pending state.  
   */
   
  const session = await mongoose.startSession();
  session.startTransaction();
  

  const transaction = await transactionModel.create({
     fromAccount,
     toAccount,
     amount,
     idemPotencyKey,
     status:"PENDING"
  },{session});

   
  const debitLedgerEntry = await ledgerModel.create({
     fromAccount,
     amount,
     transaction:transaction._id,
     type:"DEBIT"
  },{session});


   const creditLedgerEntry = await ledgerModel.create({
    toAccount,
    amount,
    transaction:transaction._id,
    type:"CREDIT"
   },{session});


   transaction.status = "COMPLETED"
   await transaction.save({session});

   await transaction.commitTransaction();
   session.endSession();


   /**
    *  * 10. Send Email Notification.
    */

   await emailService.sendTransactionEmail(
   req.user.email,
   req.user.username,
   amount,
   fromAccount,
   toAccount 
   );

   return res.status(201).json({
    message:"Transaction is completed successfully",
    transaction: transaction
   })

}


module.exports = {createTransaction}