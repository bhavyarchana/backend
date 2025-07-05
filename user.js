const mongoose = require('mongoose')

var schema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    Phone:Number,
    userType:{type:String,enum:["admin","user"],default:"user"}
})
 var UserModel = mongoose.model("user",schema);
 module.exports=UserModel;