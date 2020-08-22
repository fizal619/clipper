const { createFFmpeg } = FFmpeg;

const form = document.querySelector("form");
const output = document.querySelector("#output");
const videoPlayer = document.querySelector("video");
const loader = document.querySelector(".loader");
const modalTrigger = document.querySelector("#modal_1");
const modalContent = document.querySelector(".content");

let loading = false;


const videoLoader = () => {
  const interval = setInterval(() => {
    if (videoPlayer.readyState === 0) {
      videoPlayer.load();
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  if (loading) {
    modalContent.textContent = "Wait yuh skunt, I doing something! 😠";
    modalTrigger.checked = true;
    return;
  }

  const id = e.target.url.value.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)

  const body = {
    id:  id ? id[7] : "oHg5SJYRHA0",
    // start: `${e.target.start_minutes.value}:${e.target.start_seconds.value}`,
    // end: e.target.end.value
  }
  console.log("BODY > ", body);


  // loading = true;
  // loader.style.display = "block";
  // output.style.display = "none";
  const response = await axios.post("/api/grab", body);
  console.log("RES", response);
  // if (response.data.success) {
  //   output.style.display = "block";
  //   videoPlayer.src = response.data.url;
  //   videoLoader();
  // } else {
  //   modalContent.textContent = "It looks like we couldn't get that video. You should try another one.";
  //   modalTrigger.checked = true;
  // }
  // loader.style.display = "none";
  // loading = false;
  // console.log(response.data);
});