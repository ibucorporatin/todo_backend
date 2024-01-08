const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    checked:{
        type:Boolean,
        default:false,
        required:true,  
    },
},{timestamps:true})

module.exports=mongoose.model("todos",todoSchema)