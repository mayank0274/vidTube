import { sendReq, customAlert } from "./utilityFunctions";

const verifyOtp = ()=>{
const resendBtn = document.querySelector(".resendOtp");
const status = document.querySelector(".otpStatus");

if(resendBtn){
// resendOtp button
resendBtn.addEventListener("click", async () => {
  status.style.display = "block";
  status.innerText = "Sending otp...";
  // req url

  const url = window.location.href;
  const urlParts = url.split("/verify/");
  const reqUrl = `${urlParts[0]}/resendOtp/${urlParts[1]}`;

  // sending request
  try {
    const emptyBody = {
      value: null,
    };
    const res = await sendReq(reqUrl, emptyBody);
    const resObj = JSON.parse(JSON.stringify(res));
    status.style.display = "none";
    customAlert(`Status : ${res.msg}`);
  } catch (err) {
    const errMsg = err.toString().slice(6, err.length);
    status.style.display = "none";
    customAlert(`Status : ${errMsg}`);
  }
});
}
}

export default verifyOtp;