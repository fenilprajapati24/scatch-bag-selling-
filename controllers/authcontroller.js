const genereatetoken = require("../utils/generatestoken");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const usermodel=require("../models/user-model");
const bags =require("../data/bags");
const productModel = require("../models/product-model");



module.exports.registeruser = async function (req, res) {

  try {
    const { email, password, fullname } = req.body;

     let usercheck = await usermodel.findOne({email:email});
     if(usercheck) return res.status(401).send("you already have account .");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await usermodel.create({
      email,
      password: hash,
      fullname,
    });

    console.log("Created user:", user); // Add this to debug

    const token = genereatetoken(user); // Pass full user object

    res.cookie("token", token);
    res.send("User success!");
  } catch (err) {
    console.error("Error in registeruser:", err);
    res.status(500).send("Server error");
  }
};

module.exports.loginuser=async function(req,res){
  let {email,password}=req.body;
  let user=await usermodel.findOne({email:email});
  if(!user) return res.send("email or password incorrect");
  bcrypt.compare(password,user.password ,async function(err,result){
    // res.send(result);
    if(result)
    {
      let token=genereatetoken(user);
      res.cookie("token",token);
            res.redirect("/shop");

      // res.send("you can loginn");
        // let products=await productModel.find();
        // res.render("shop",{ products  });  

      // res.render("shop");
      // res.render("shop",{bags}) ;
    }
    else
    {     
      res.send("something is wrong ");   // while no login 
    }
  })
}

module.exports.logout= function(req,res){


  res.cookie("token","");
  res.redirect("/");
}
