const { default: mongoose } = require("mongoose");
const  Mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref:"user"},
     productId: {type: mongoose.Schema.Types.ObjectId,ref:"product"},
});

const CartModel = Mongoose.model("cart",CartSchema);
module.exports = CartModel;