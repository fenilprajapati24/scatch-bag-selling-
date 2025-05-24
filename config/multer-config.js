// user for storeage 


const multer=require("multer");
const storeage=multer.memoryStorage();
const upload=multer({storage:storeage});

module.exports=upload;