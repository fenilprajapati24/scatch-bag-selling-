const express=require("express");
const router=express.Router();
const islogged=require("../middlewares/isloggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");


router.get("/",function(req,res){

  let error=req.flash("error");
  res.render("index",{error,loggedin:false});

});

router .get("/shop",islogged, async function(req,res){
  let products=await productModel.find();
  let succes=req.flash("success");
  res.render("shop",{ products  ,succes});  
});

router .get("/cart",islogged, async function(req,res){
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
  // const bill=Number(user.cart[0].price)+20-Number(user.cart[0].discount);
  res.render("cart",{user});  

  // console.log(user.cart);
});






router.get("/addtocart/:productid", islogged, async function(req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    console.log(req.user);

    // Ensure the cart is initialized
    if (!user.cart) {
      user.cart = [];
    }

    // Optional: check if item is already in cart to avoid duplicates
    if (!user.cart.includes(req.params.productid)) {
      user.cart.push(req.params.productid);
    }

    await user.save();
    req.flash("success", "Added to cart");

    res.redirect("/shop"); // Don't call render after redirect
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while adding to cart");
  }
});

// router .get("/addtocart/:productid",islogged, async function(req,res){
//   let user=await userModel.findOne({email:req.user.email});
//   console.log(req.user);
//   user.cart.push(req.params.productid);
//   await  user.save();
//   req.flash("success","added to cart");
//   res.redirect("/shop");
//   res.render("shop",{ user  });  
// });
// router.post('/cart/remove/:id', (req, res) => {
//   const id = req.params.id;
//   req.session.user.cart = req.session.user.cart.filter(item => item.id !== id);
//   res.redirect('/cart');
// });


// Remove item from cart
router.post("/cart/remove/:id", islogged, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });

    // Remove the item from the user's cart
    user.cart = user.cart.filter(item => item.toString() !== req.params.id);

    await user.save();
    req.flash("success", "Item removed from cart");
    res.redirect("/cart"); // or wherever your cart view is
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing item from cart");
  }
});


module.exports=router;

