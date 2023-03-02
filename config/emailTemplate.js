module.exports = (otp,name,email)=>{
return `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">vidTube</a>
    </div>
    <p style="font-size:1.1em">Hi ${name},</p>
    <p>Thank you for choosing vidTube. Use the following OTP to complete your Sign Up procedures.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p>You can also click on below button to enter otp and verify to account</p>
     <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href="http://localhost:3000/verify/${email}" style="text-decoration:none;color:#fff;">Verify account</a></h2>
    <p style="font-size:0.9em;">Regards,<br />vidTube</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>vidTube <br> Haryana,India</p>
    </div>
  </div>
</div>`
}