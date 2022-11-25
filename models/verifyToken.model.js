const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    invitationId:{
        type:String,
        ref:"Users",
        unique:true,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});
module.exports=mongoose.model("VerfiyToken",tokenSchema)