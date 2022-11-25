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

const weddingCreatorSchema = mongoose.Schema({
    // userId:{
    //     type:String,
    //     required:[true,'UserId is Required']
    // },
    groomDetails:{
        groomName:{
            type:String,
            required:[true,'GroomName is Required']
        },
        groomDetails:{
            type:String,
            required:[true,'GroomDetails is Required']
        },
        groomPhoto:{
            type:String,
            required:[true,'groomPhoto is Required']
        },
        groomProfession:{
            type:String
        }
    },
    brideDetails:{
        brideName:{
            type:String,
            required:[true,'BrideName is Required']
        },
        brideDetails:{
            type:String,
            required:[true,'BrideDetails is Required']
        },
        bridePhoto:{
            type:String,
            required:[true,'BridePhoto is Required']
        },
        brideProfession:{
            type:String
        }
    },
    loveStory:{
        type:String,
        required:[true,'BridePhoto is Required']
    },
    gallery:[String],
    events:[eventSchema],
    contactDetails:{
        contactName:{
            type:String
        },
        phoneNumber:{
            type:String
        }
    },
    emailId:{
        type:String,
        required:[true,'EmailId is Required']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model('WeddingCreator',weddingCreatorSchema)