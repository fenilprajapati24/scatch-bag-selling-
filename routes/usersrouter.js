
const express=require('express');
const router=express.Router();
const usermodel=require('../models/user-model');
const jwt=require("jsonwebtoken");
const {registeruser,loginuser,logout}=require("../controllers/authcontroller");
// const {registeruser}=require("../")


const bcrypt=require("bcrypt");




router.get('/',(req,res)=>{
  res.send('hey');
})

router.post("/register",registeruser );
router.post("/login",loginuser);
router.get("/logout",logout);

module.exports=router;
