const express=require('express');
const router=express.Router();
const ownermodel=require('../models/owner-model');
const productModel = require('../models/product-model');


if(process.env.NODE_ENV ==="development")
 {

router.post('/create', async (req, res) => {                   
  try {
     
    const { fullname, email, password } = req.body;

    const createdowner = await ownermodel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdowner);
    
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
   
});


 }

router.get('/',(req,res)=>{
  res.send('hey it s working ');
})

router.get("/admin",function(req,res){

  // res.send("hey it is working ");
  let succes=req.flash("succes");
  res.render("createproducts",{succes});

})

router.get('/admin/clear-products', async (req, res) => {
  await productModel.deleteMany({});
  res.send('All products deleted successfully.');
});

// console.log(process.env.NODE_ENV);

 


module.exports=router;