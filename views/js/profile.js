import {showError,showSuccess} from "./utilityFunctions"

const profile = ()=>{
// tabs -> upload and myVideos 
const myVideoTab = document.querySelector(".myVideos")
const uploadVideoTab = document.querySelector(".uploadVideo")
const myVideoSec = document.querySelector(".videoSec")
const uploadSec = document.querySelector(".uploadSec")

if(uploadVideoTab){
uploadVideoTab.addEventListener("click",()=>{
  myVideoSec.style.display = "none";
  uploadSec.style.display = "block"
  myVideoTab.classList.remove("activeTab")
  uploadVideoTab.classList.add("activeTab")
})

myVideoTab.addEventListener("click",()=>{
  myVideoSec.style.display = "block";
  uploadSec.style.display = "none"
  myVideoTab.classList.add("activeTab")
  uploadVideoTab.classList.remove("activeTab")
})

}
// upload video and poster
const video = document.querySelector("#videoFile")
const poster = document.querySelector("#poster")
const videoTitle = document.querySelector("#title")
const btn = document.querySelector(".uploadBtn")
const response = document.querySelector(".response")

if(uploadSec){
video.addEventListener("change",()=>{
  response.style.display = "none"
})

 poster.addEventListener("change",()=>{
  response.style.display = "none"
})

const upload = ()=>{
 
  const videoFile = video.files[0]
  const posterFile = poster.files[0]
 
  const data = new FormData()
  data.append("poster",posterFile)
  data.append("video",videoFile)
  data.append("title",videoTitle.value)
  
  const xhr = new XMLHttpRequest()
  xhr.open("POST","https://vidtube.onrender.com/upload")

  xhr.onload = ()=>{
    //console.log(xhr.responseText)
    response.innerText = "File uploaded successfully";
    showSuccess("File uploaded successfully");
    video.files = " ";
    poster.files = " ";
  }
  
  xhr.onerror = (err)=>{
   showError(err);
   video.files = " ";
    poster.files = " ";
  }
  
  xhr.send(data)
}

btn.addEventListener("click",()=>{
  upload()
  response.style.display = "block"
})
}
}

export default profile;