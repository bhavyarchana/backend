// import 
 const express=require("express")
 require("./connection")
 var Promodel=require("./model/product")
 var Studmodel=require("./model/user")
 var cors= require("cors")
const UserModel = require("./model/user")
const CartModel = require("./model/cart")
//  intilize
const app=express()

// mid
app.use(express.json());
app.use(cors())
// login
app.post("/login",async(req,res)=>{
    try {
        var user=await UserModel.findOne({Email:req.body.Email});
        if(!user){
            return res.send("user not found");
        
        }
    if(user.Password == req.body.Password) {
        return res.send({
            message:"logged in successfully",
            email: user.Email, 
            name: user.Name,
            userType: user.userType,
            id: user._Id
        });

     }else{
            return res.send({message:"Invaild credentials"});
        }

    } catch (error) {
        
    }
});
// create signup data
app.post("/signup",async(req,res)=>{
    try{
        await UserModel(req.body).save()
        res.send("added up successful!!");
    }catch(error){
        console.log(error);
    }
});
// to view the sign up
app.get("/view",async(req,res)=>{
    try {
        var data= await UserModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

// api creation
app.get('/', (req, res) => {
  res.send('Hello World')
})

// add api
app.post("/add",async(req,res)=>{
    try{
        await Promodel(req.body).save()
        res.send("data send");
    }catch(error){
        console.log(error)
    }
})

// view api
app.get("/view",async(req,res)=>{
    try {
        var data= await Promodel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
// delete api
app.delete("/delete/:id", async (req, res) => {
  try {
     await Promodel.findByIdAndDelete( req.params.id);
     res.send({message:"data deleted"})
  }catch (error) {
        console.log(error)
    }
})

// update api 
app.put("/update/:id", async (req, res) => {
  try {
     await Promodel.findByIdAndUpdate(req.params.id,req.body)
     res.send("data update")
  } 
  catch (error) {
        console.log(error)
    }
})
   
// port setting
app.listen(3000,()=>{
    console.log("port is running")
})

// 
app.post("/add-to-cart,",async (req,res)=>{
    try {
        await CartModel(req.body).save();
        res.send({ message:"Added  to cart"});
    } catch (error) {
        console.log(error);
        res.send({ message:"failed to add to cart"});
        
    }
});

// 
app.get("/my-cart/:userId",async (req,res)=>{
    try {
        const cartItems = await CartModel.find({ userId: req.params.userId}).populate("productId");
        res.send(cartItems);
    } catch (error) {
        res.send({message:"Error fetching cart"}); 
    }
});