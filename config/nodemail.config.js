const nodemailer = require('nodemailer');
// ! Required to get variables from .env file
require('dotenv').config({path: __dirname + '/../.env'});

const mailTransporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    secure: false,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    } 
});

module.exports = mailTransporter;

// var mailOptions = {
//     from: process.env.MAIL_ID,
//     to:'dineshtech2000@gmail.com',
//     subject:'DEMO mail',
//     text:'Demo mail test'
// };
// transporter.sendMail(mailOptions,(error,info)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log('Email Info: '+info.response)
//     }
// })