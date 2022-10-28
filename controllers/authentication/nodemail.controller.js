const mailTransporter = require("../../config/nodemail.config");
const asyncHandler = require('express-async-handler');

const sendVerificationEmail = async(emailId,verifyUrl)=>{
    var mailOptions = {
    from: process.env.MAIL_ID,
    to:emailId,
    subject:'User Verification Mail',
    text:"Verify the email with the below link",
    html: '<p>Click here <a href='+verifyUrl +'>here</a> to verify your account</p>'

};
    const emailRes=await sendEmail(mailOptions);
    return emailRes;
}

const sendWeddingInvitationApproveEmail = async(emailId,invitationUrl)=>{
    var mailOptions = {
        from: process.env.MAIL_ID,
        to:emailId,
        subject:'Congrats your Invitation has been approved',
        text:"Verify the email with the below link",
        html: '<p>Your Wedding Invitation is live! <a href='+invitationUrl +'>'+invitationUrl+'</a></p>'
    
    };
        const emailRes=await sendEmail(mailOptions);
        return emailRes;
}

const sendEmail = async(mailOptions)=>{
    console.log("Mail Options"+mailOptions);
    return await mailTransporter.sendMail(mailOptions);
}
// mailTransporter.sendMail(mailOptions,(error,info)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log('Email Info: '+info.response)
//     }
// })

module.exports = {sendVerificationEmail,sendWeddingInvitationApproveEmail}