const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    role:{
        type:String,
        enum:["SuperAdmin", "Admin", "User"],
        default:"User",
        required:true
    }
}, {timestamps:true});


userSchema.pre("save", async function(){
    if(!this.isModified("password") || !this.password) return;
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
        console.log(`Password hashing problem, ${error.message}`)
    }
});

userSchema.methods.comparepassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);