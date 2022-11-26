const mongoose = require('mongoose');


const featureScheme = mongoose.Schema({
    featurePhoto:{
        type:String
    },
    featureText:{
        type:String
    }
})

const commentSchema = mongoose.Schema({
    name:{
        type:String
    },
    comment:{type:String}
})

const InvitationPageSchema = mongoose.Schema({
    homePageName:{type:String},
    title:{
        type:String,
   },
    bannerPhoto:{type:String},
    whyInvite:[String],
    whyInvitePhoto:{type:String},
    features:[featureScheme],
    comments:[commentSchema]
})

module.exports = mongoose.model('HomePage',InvitationPageSchema)