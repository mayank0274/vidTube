import { sendReq, customAlert } from "./utilityFunctions";

const forgotPassword = ()=>{
  
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const otp = document.querySelector(".receivedOtp");
const sendEmailBtn = document.querySelector("#sendEmail");
const updatePasswordBtn = document.querySelector("#updatePassword");

const form = document.querySelector(".resetPasswordForm");

if(form){
// sending otp
sendEmailBtn.addEventListener("click", async () => {
  const reqUrl = "https://vidtube.onrender.com/forgotPasswordOtp";
  const body = {
    email: email.value,
  };

  // sending request
  try {
    const res = await sendReq(reqUrl, body);
    customAlert(`Status : ${res.msg}`);
  } catch (err) {
    const errMsg = err.toString().slice(6, err.length);
    customAlert(`Status : ${errMsg}`);
  }
});

// updating password
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reqBody = {
    email: email.value,
    password: password.value,
    otp: otp.value,
  };
  const reqUrl = "https://vidtube.onrender.com/updatePassword";
  // sending request
  try {
    const res = await sendReq(reqUrl, reqBody);
    customAlert(`Status : ${res.msg}`);
  } catch (err) {
    const errMsg = err.toString().slice(6, err.length);
    customAlert(`Status : ${errMsg}`);
  }
});
}
}

export default forgotPassword;