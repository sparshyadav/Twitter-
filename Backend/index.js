const express=require("express");
require("dotenv").config();

const app=express();
const PORT=process.env.PORT || 4445;

app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}`);
})