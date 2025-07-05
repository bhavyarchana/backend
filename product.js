const mongoose = require('mongoose')

var schema=mongoose.Schema({
    Pname:String,
    price:Number,
    Disc:String,
    Image:String
})
 var ProductModel = mongoose.model("product",schema)
 module.exports=ProductModel