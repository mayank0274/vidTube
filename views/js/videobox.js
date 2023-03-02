// play video by clicking them

const videoBoxLink = ()=>{
  const videoDiv = Array.from(document.querySelectorAll(".videoBox"))

if(videoDiv){
videoDiv.forEach((e)=>{
  const link = e.getAttribute("data-link")
  if(!link){
    return;
  }
  e.addEventListener("click",()=>{
    const linkElem = document.createElement("a")
    linkElem.setAttribute("href",link)
    linkElem.click()
    linkElem.style.display = "none"
    e.appendChild(linkElem)
  })
})
}
}

export default videoBoxLink;