const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventName:{
        type:String,
        required:[true,'EventName is required']
    },
    eventDate:{
        type:String,
        required:[true,'EventDate is required']
    },
    eventTime:{
        type:String,
        required:[true,'EventTime is required']
    },
    eventVenue:{
        type:String,
        required:[true,'EventVenue is required']
    },
    eventMapLink:{
        type:String,
        required:[true,'EventVenue is required']
    }
})
const hostSchema = mongoose.Schema({
    hostName:{
        type:String,
        required:[true,"Host Name is required"]
    },
    hostQualification:{
        type:String
    },
    hostJob:{
        type:String
    }
})
const houseWarmingSchema = mongoose.Schema({
    inviteMessage:{
        type:String,
        required:[true,"InviteMessage is required"]
    },
    hostDetails:[hostSchema],
    gallery:[String],
    videoInvite:{type:String},
    events:[eventSchema],
    emailId:{
        type:String,
        required:[true,"EmailId is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('HouseWarmingCreator',houseWarmingSchema)