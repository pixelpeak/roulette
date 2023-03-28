"use strict";
{
  class Panel {
    constructor() {
      const music = new Audio("musics/MusMus-BGM-126.mp3");
      const section = document.createElement("section");
      section.classList.add("panel");

      this.img = document.createElement("img");
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;
      this.spinStop = document.createElement("div");
      this.spinStop.setAttribute("id", "spin");
      this.spinStop.textContent = "スタート";
      this.spinStop.addEventListener("click", () => {
        if (this.spinStop.classList.contains("inactive")) {
          clearTimeout(this.timeoutId);
          this.spinStop.classList.remove("inactive");
          this.spinStop.classList.add("stop");
          this.spinStop.textContent = "スタート";
          music.pause();
          return;
        }
        this.spinStop.classList.remove("stop");
        this.spinStop.classList.add("inactive");
        this.spin();
        this.spinStop.textContent = "ストップ";
        music.play();
        music.loop = true;
      });

      section.appendChild(this.img);
      section.appendChild(this.spinStop);

      const content = document.getElementById("content");
      content.appendChild(section);
    }

    getRandomImage() {
      const images = [
        "img/gift-1.png",
        "img/gift-2.png",
        "img/gift-3.png",
        "img/gift-4.png",
        "img/gift-5.png",
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 100);
    }
  }
  new Panel();
}
