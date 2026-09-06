const mongoose = require("mongoose");

const tokenBlackListSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to blacklist"],
        unique:[true,"token is already blacklisted"]
    },
    // blackListedAt:{
    //     type:Date,
    //     default:Date.now,
    //     immutable:true
    // }
},{timestamps:true});

tokenBlackListSchema.index({createdAt:1},{
    expireAfterSeconds:60*60*24*3 // after 3 days it will automatically expire
});

const tokenBlacklistModel = mongoose.model("TokenBlacklist",tokenBlackListSchema);

module.exports = tokenBlacklistModel;