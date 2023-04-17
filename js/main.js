async function fetchImages() {
  const responseNewt = await fetch(
    // https://{spaceUid}.cdn.newt.so/v1/{appUid}/{modelUid}
    "https://pixelpeak.cdn.newt.so/v1/field-1/image",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer GMIyC18AcPx6LGigE8srP9pDHLhR_D8goOA3_oZLmhk",
      },
    }
  );

  if (responseNewt.ok) {
    const dataNewt = await responseNewt.json();
    const imageUrls = dataNewt.items.map((entry) => entry.image.src);
    appendImagesToDiv(imageUrls);
  }
}

function appendImagesToDiv(imageUrls) {
  const animeDiv = document.querySelector(".anime");

  imageUrls.forEach((imageUrl, index) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    if (index !== 0) {
      img.style.display = "none";
    }
    animeDiv.appendChild(img);
  });

  // Call viewFrame after appending images
  viewFrame();
}

const frames = document
  .getElementsByClassName("anime")[0]
  .getElementsByTagName("img");

function viewFrame(frame_no = -1) {
  if (frames[frame_no]) {
    frames[frame_no].style.display = "none";
  }
  frame_no++;
  if (frames[frame_no]) {
    frames[frame_no].style.display = "block";
  } else {
    frames[0].style.display = "block";
    frame_no = 0;
  }
  const msec = document.getElementById("anime_speed").value;
  setTimeout(function () {
    viewFrame(frame_no);
  }, msec);
}

const music = new Audio("musics/MusMus-BGM-126.mp3");

function play() {
  music.loop = true;
  music.play();
}

// Call fetchImages at the end
fetchImages();
