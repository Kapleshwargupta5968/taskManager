const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    isCompleted: {
        type:Boolean,
        default:false
    }
}, {timestamps:true});

module.exports = mongoose.model("Todo", todoSchema);