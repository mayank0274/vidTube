import videoBoxLink from './videobox'
import videoAction from "./videoAction"
import verifyOtp from "./verifyOtp"
import profile from "./profile"
import forgotPassword from "./forgotPass"
import Plyr  from 'plyr'

let toggle = document.querySelector(".toggle");
let nav = document.querySelector(".menu");

let overlay = document.querySelector("#overlay");

toggle.addEventListener("click", () => {
  overlay.style.display = "block";
  nav.style.display = "block";
  toggle.style.display = "none";
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  nav.style.display = "none";
  toggle.style.display = "block";
});

const mySwiper = document.querySelector(".mySwiper")

if(mySwiper){
var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}

// playvvideo by clicking them
videoBoxLink();

// like , dislike etc.
videoAction();

// verify otp 
verifyOtp();

// profile 
profile();

// forgotPassword
forgotPassword();

//plyyr
const videoElem = Array.from(document.querySelectorAll("video"))

videoElem.forEach((elem)=>{
  const player = new Plyr(elem)
})