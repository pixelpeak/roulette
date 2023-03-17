'use strict';
{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.status = document.createElement('div');
      this.status.setAttribute('id', 'status');
      this.status.textContent = 'ストップボタンをおしてね';

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;
      this.spinStop = document.createElement('div');
      this.spinStop.setAttribute('id', 'spin');
      this.spinStop.textContent = 'もういちどふる';
      this.spinStop.addEventListener('click', () => {
        if (this.spinStop.classList.contains('inactive')) {
          clearTimeout(this.timeoutId);
          this.spinStop.classList.remove('inactive');
          this.spinStop.classList.add('stop');
          this.spinStop.textContent = 'もういちどふる';
          this.getNumbers();
          return;
        }
        this.spinStop.classList.remove('stop');
        this.spinStop.classList.add('inactive');
        this.spin();
        this.spinStop.textContent = 'ストップ';
      });

      this.drawCard = document.createElement('div');
      this.drawCard.setAttribute('id', 'draw-card');
      this.drawCard.textContent = 'カードをひく';
      this.cardChoice = document.getElementById('card-choice')
      this.drawCard.addEventListener('click', () => {
        this.cardChoice.classList.remove('hidden');
        this.cardChoice.classList.add('slidein', 'choice-card');
        main.classList.add('hidden');
        clearTimeout(this.timeoutId);
        this.spinStop.classList.remove('inactive');
        this.spinStop.classList.add('stop');
        this.spinStop.textContent = 'もういちどふる';
        this.getNumbers();
      });

      this.modal = document.getElementById('modal');
      this.mask = document.getElementById('mask');
      this.open = document.getElementsByClassName('open');
      this.close = document.getElementById('close');
      for(let i = 0; i < this.open.length; i++) {
        this.open[i].addEventListener('click', () => {
          this.modal.classList.remove('hidden');
          this.mask.classList.remove('hidden');
        });
      };

      this.return = document.getElementById('return');
      this.return.addEventListener('click', () => {
        this.modal.classList.add('hidden');
        this.mask.classList.add('hidden');
        this.cardChoice.classList.add('hidden');
        main.classList.remove('hidden');
        this.status.textContent = 'ストップボタンをおしてね';
      });

      this.close.addEventListener('click', () => {
        this.modal.classList.add('hidden');
        this.mask.classList.add('hidden');
        this.cardChoice.classList.add('hidden');
        main.classList.remove('hidden');
        this.spinStop.classList.remove('stop');
        this.spinStop.classList.add('inactive');
        this.spin();
        this.spinStop.textContent = 'ストップ';
      });

      section.appendChild(this.status);
      section.appendChild(this.img);
      section.appendChild(this.spinStop);
      section.appendChild(this.drawCard);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
    spin() {
      this.status.textContent = 'ストップボタンをおしてね';
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 100);
    }
    getNumbers() {
      if (this.spinStop.classList.contains('stop')) {
        const filename = this.img.src.split('/').reverse()[0].split('.')[0];
        this.status.textContent = filename + '！';
      }
    }
  }
  new Panel();
}