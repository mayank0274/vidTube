import { sendReq, showError } from "./utilityFunctions";

const videoAction = ()=>{
//share video
const shareBtn = document.querySelector(".share");

if(shareBtn){
shareBtn.addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Video url",
        url: window.location.href,
      })
      .then(() => {
        // console.log("share success")
      })
      .catch((err) => {
        showError("Browser not supported")
      });
  }
});
}
// video actio -> like, dislike,report
const action = Array.from(document.querySelectorAll(".actionBtn"));

if(action){

action.forEach((btn) => {
  // reqUrl
  const params = btn.getAttribute("data-href");
  const url = window.location.href;
  const urlParts = url.split("/playVideo/");
  const reqUrl = `${urlParts[0]}${params}`;
  // getting icon
  const iconElem = btn.firstChild;
  btn.addEventListener("click", async () => {
    try {
      const emptyBody = {
        value: null,
      };
      const res = await sendReq(reqUrl, emptyBody);
      const resObj = JSON.parse(JSON.stringify(res));
      iconElem.removeAttribute("class");
      iconElem.setAttribute("class", resObj.iconClass);
    } catch (err) {
      const errMsg = err.toString().slice(6, err.length);
      showError(errMsg);
    }
  });
});
}
}

export default videoAction;