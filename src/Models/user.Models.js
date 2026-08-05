const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required for user"],
        unique:[true,"email already exists"],
        lowercase:true,
        trim:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email Address"],
    },
    username:{
        type:String,
        required:[true,"username is required for the creating the account"]
    },
    password:{
        type:String,
        required:[true,"password is required for the creating the accounts"],
        minLength:[6,"length of the password should be more than the 6 length"],
        select:false
    }
},{
    timestamps:true
})

userSchema.pre("save",async function (){
    if(!this.isModified("password")){
        return;
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
     return;
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.model("user",userSchema);

module.exports =  userModel;