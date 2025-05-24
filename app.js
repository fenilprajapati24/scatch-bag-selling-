const express=require('express');
const app=express();  
const path=require('path');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
require("dotenv").config();
const expresssession=require("express-session");
const flash=require("connect-flash");
const indexrouter=require("./routes/index");


const db=require('./config/mongoose-connections');
const ownersrouter=require('./routes/ownersrouter');
const usersrouter=require('./routes/usersrouter');
const productsrouter=require('./routes/productsrouter');


app.use(express.static(path.join(__dirname, "public")));  // use for public folder for css 


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set('view engine','ejs');    // both lines are for use ejs file g
app.set('views',path.join(__dirname,'views')); 
app.use(cookieParser());

app.use(expresssession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET || 'defaultSecret123',
}));



app.use(flash());
// app.get('/',(req,res)=>{

//   // res.send("hello fenil");

// })

app.use("/",indexrouter);
app.use('/owners',ownersrouter);
app.use('/users',usersrouter);
app.use('/products',productsrouter);


// if (process.env.NODE_ENV === 'development') {

//     app.use('/owners', ownersrouter);
// }

const PORT=3015;

app.listen(PORT,()=>{
   
  console.log(`Server running on address http://localhost:${PORT}`);

})