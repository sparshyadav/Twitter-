const mongoose=require("mongoose");

const likeSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports=mongoose.model("Like", likeSchema);