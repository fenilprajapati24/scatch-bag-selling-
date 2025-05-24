const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const prodctmodel = require("../models/product-model");

router.get("/", (req, res) => {
  res.send("product router ");
});

router.post("/create", upload.single("image"), async function (req, res) {
  // res.send("create of product router  ");
  // res.send(req.file);
try {
  let {  name,price,discount,bgcolor,panelcolor,textcolor,} = req.body;

  let product = await prodctmodel.create({
    image: req.file.buffer,
    name,price,discount,bgcolor,panelcolor,textcolor
  });

    req.flash("success","product created succesfully");
   res.redirect("/owners/admin");
  // res.send(product);

}
  catch(err){

    res.send(err.message);
  }
});

module.exports = router;
