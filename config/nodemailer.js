
const nodemailer = require("nodemailer")

const sendEmail = async (email,subject,otp,name)=>{
 
  const transporter = nodemailer.createTransport({
    host : "smtp.outlook.com",
    auth : {
      user : process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  const mailOptions = {
    from : process.env.EMAIL,
    to : email,
    subject : subject,
    //text : "hello"
    html : require("./emailTemplate")(otp,name,email)
  }
  try{
 const response = await transporter.sendMail(mailOptions)
 
 return "Email sent successfully";
}catch(err){
  return "Error in sending email"
}
}


module.exports = sendEmail;