// microCMSから画像を取得する
async function fetchImages() {
  const response = await fetch("https://pixelpeak.microcms.io/api/v1/img", {
    method: "GET",
    headers: {
      "X-API-KEY": "alGh59Xxuh00qhalyypQfgOYdDDXJ1yo9Bwh",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Fetched images:", data);
    const imageUrls = data.contents.map((entry) => entry.title.url);
    console.log("Image URLs:", imageUrls);
  } else {
    console.error("Error fetching images:", response.statusText);
  }
}

fetchImages();

const imageCount = 5;
const imageFolderPath = "img/";
const imageFileName = "gift-";
const imageFileExtension = ".png";

const animeDiv = document.querySelector(".anime");

for (let i = 1; i <= imageCount; i++) {
  const img = document.createElement("img");
  img.src = `${imageFolderPath}${imageFileName}${i}${imageFileExtension}`;
  animeDiv.appendChild(img);
}

const frames = document
  .getElementsByClassName("anime")[0]
  .getElementsByTagName("img");
viewFrame();

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
