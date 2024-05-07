const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=async(req, res, next)=>{
    try{
        const token=req.cookies.token;

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token Not Found"
            })
        }

        const decode=jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){

    }
}