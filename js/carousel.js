

// carousel

// Optional storage (kept for backwards compatibility if used elsewhere)
let carouselArr = [];

class Carousel {
  // static fields used by the static API
  static _items = [];
  static _sequence = 0;
  static _interval = null;

  constructor(images = []) {
    this.images = images;
    this._interval = null;
    this.currentIndex = 0;
  }

  // instance API
  start(intervalMs = 2000) {
    this.showNext();
    this._interval = setInterval(() => this.showNext(), intervalMs);
  }

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  showNext() {
    if (!Array.isArray(this.images) || this.images.length === 0) return;

    const imgDiv = document.getElementById('carousel');
    const titleDiv = document.getElementById('carousel-title');

    const { image, title, url } = this.images[this.currentIndex] || {};
    if (imgDiv && image) imgDiv.style.backgroundImage = `url('${image}')`;
    if (titleDiv) titleDiv.innerHTML = url ? `<a href="${url}">${title}</a>` : (title || '');

    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // static API (backwards compatible with older code)
  static Start(arr, intervalMs = 5000) {
    if (!Array.isArray(arr)) throw new Error('Method Start expects an array');
    if (arr.length === 0) return;

    Carousel._items = arr.slice();
    Carousel._sequence = 0;

    // run first frame
    Carousel.Next();

    // clear previous interval if any
    if (Carousel._interval) clearInterval(Carousel._interval);
    Carousel._interval = setInterval(() => Carousel.Next(), intervalMs);
  }

  static Next() {
    if (!Array.isArray(Carousel._items) || Carousel._items.length === 0) return;

    const imgDiv = document.getElementById('carousel');
    const titleDiv = document.getElementById('carousel-title');

    const item = Carousel._items[Carousel._sequence] || {};
    const image = item.image;
    const title = item.title || '';
    const url = item.url || '';

    if (imgDiv && image) imgDiv.style.backgroundImage = `url('${image}')`;
    if (titleDiv) titleDiv.innerHTML = url ? `<a href="${url}">${title}</a>` : title;

    Carousel._sequence = (Carousel._sequence + 1) % Carousel._items.length;
  }
}

// attach to window for global access in browser
if (typeof window !== 'undefined') window.Carousel = Carousel;

