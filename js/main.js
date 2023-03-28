var frames = document
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
  var msec = document.getElementById("anime_speed").value;
  setTimeout(function () {
    viewFrame(frame_no);
  }, msec);
}

const music = new Audio("musics/MusMus-BGM-126.mp3");

function play() {
  music.loop = true;
  music.play();
}
