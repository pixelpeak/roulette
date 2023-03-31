async function fetchImages() {
  const response = await fetch("https://pixelpeak.microcms.io/api/v1/img", {
    method: "GET",
    headers: {
      "X-API-KEY": "alGh59Xxuh00qhalyypQfgOYdDDXJ1yo9Bwh",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const imageUrls = data.contents.map((entry) => entry.img.url);

    // Append fetched images to the anime div and call viewFrame
    appendImagesToDiv(imageUrls);
  } else {
    console.error("Error fetching images:", response.statusText);
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
