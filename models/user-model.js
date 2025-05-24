const mongoose=require('mongoose');

const userschme= mongoose.Schema({

    fullname:{

    type:String,
    minlength:3,
    trim:true,
   },
   email:String,
   password:String,
   cart:[{

     
    type:mongoose.Schema.Types.ObjectId,
    ref:"product",    

   }],

   isadmin:Boolean,
   orders:{
    type:Array,
    default:[],
   },
   contact:Number,
   picture:String,

   

});

module.exports=mongoose.model("user",userschme);