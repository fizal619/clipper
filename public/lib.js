const modalContent = document.querySelector(".content");

const loadBlobToPlayer = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

  reader.onload = () => {
    videoPlayer.src = reader.result;
    output.style.display = "block";
  };
}

const modalError = () => {
  modalContent.textContent = "It looks like we couldn't get that video. You should try another one.";
  modalTrigger.checked = true;
}
