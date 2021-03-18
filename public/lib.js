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

const corsAnywhereConfirm = async () => {
  try {
      const req = await axios.get("https://cors.bridged.cc/cors-anywhere.herokuapp.com/corsdemo", {
        Headers: {
          'origin': 'https://app.cors.bridged.cc'
        }
      });
  } catch ({response}) {
    console.log(response.data);
    const body = document.createElement("p");
    body.innerHTML = response.data;
    const token = body.querySelector("input[type='hidden']").value;
    try {
      const req2 = await axios.get(`https://cors.bridged.cc/cors-anywhere.herokuapp.com/corsdemo?accessRequest=${token}`, {
        Headers: {
          'origin': 'https://app.cors.bridged.cc'
        }
      });
    } catch({response}) {
      console.log(response.data);
    }
  }
}
