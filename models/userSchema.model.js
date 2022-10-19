const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required']
    },
    email:{
        type:String,
        required:[true,'Email Id is Required']
    },
    mobileNumber:{
        type:String,
        required:[true,'Phone Number is Required'],
        length:10
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    }
},{
    timeStamps:true,
}
)
module.exports = mongoose.model('Users',userSchema)