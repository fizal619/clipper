const form = document.querySelector("form");
const output = document.querySelector("#output");
const videoPlayer = document.querySelector("video");
const loader = document.querySelector(".loader");
const modalTrigger = document.querySelector("#modal_1");
const status = document.querySelector("#status_message");
const progress = document.querySelector("#progress");

let loading = false;

form.addEventListener("submit", async e => {
  e.preventDefault();

  if (loading) {
    modalContent.textContent = "Wait yuh skunt, I doing something! 😠";
    modalTrigger.checked = true;
    return;
  }

  const body = {
    url: e.target.url.value
  }
  const trimOptions = {
    start: `${e.target.start_minutes.value}:${e.target.start_seconds.value}`,
    end: e.target.end.value
  }

  // console.log("BODY > ", body, "OPTIONS", trimOptions);


  loading = true;
  loader.style.display = "block";
  output.style.display = "none";
  status.textContent = "Trying to get download url 🔎";

  // get direct url
  const response = await axios.post("/api/grab", body);
  // console.log("RES", response.data);

  if (response.data.success) {
    //download it to blob
    const corsBypassedStream = `https://cors-anywhere.herokuapp.com/${response.data.stream}`;
    status.textContent = "Got download url, getting video 🎥";
    try {
      FFmpeg.setLogging(true)
      const ffmpeg = FFmpeg.createWorker({
        logger: (data) => console.log(data),
      });
      await ffmpeg.load();
      // console.log("writing w/ ffmpeg");
      await ffmpeg.write("video.mp4", corsBypassedStream);
      status.textContent = "Got video, trimming ✂";
      // console.log("run ffmpeg");
      // console.log(await ffmpeg.ls("/"));
      await ffmpeg.run(
        `-i video.mp4 -preset ultrafast -ss ${trimOptions.start} -t ${trimOptions.end} flame.mp4`
      );
      // console.log("read ffmpeg?");
      const buffer = await ffmpeg.read("flame.mp4");
      await ffmpeg.terminate();
      const videoBlob = new Blob([buffer.data], {type: "video/mp4"});
      loadBlobToPlayer(videoBlob);
    } catch (e) {
      console.error(e);
      modalError();
    }
  } else {
    modalError();
  }
  loader.style.display = "none";
  loading = false;
});

