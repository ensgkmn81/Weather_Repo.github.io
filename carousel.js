// Background Carousel Class - YENİ DOSYA
class BackgroundCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.background-slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.autoplayBtn = document.getElementById('autoplayBtn');
    this.currentSlide = 0;
    this.isAutoplay = true;
    this.autoplayInterval = null;
    
    this.init();
  }
  
  init() {
    // Event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.autoplayBtn.addEventListener('click', () => this.toggleAutoplay());
    
    // Indicator click events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Start autoplay
    this.startAutoplay();
  }
  
  goToSlide(slideIndex) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');
    
    // Update current slide
    this.currentSlide = slideIndex;
    
    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
  
  startAutoplay() {
    if (this.isAutoplay) {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 4000); // 4 saniyede bir değiş
    }
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  toggleAutoplay() {
    this.isAutoplay = !this.isAutoplay;
    
    if (this.isAutoplay) {
      this.autoplayBtn.textContent = '⏸ Durdur';
      this.autoplayBtn.classList.add('active');
      this.startAutoplay();
    } else {
      this.autoplayBtn.textContent = '▶ Başlat';
      this.autoplayBtn.classList.remove('active');
      this.stopAutoplay();
    }
  }
}

// Carousel'ı başlat
const carousel = new BackgroundCarousel();