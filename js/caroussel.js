document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.banner-card-caroussel img');
    let currentIndex = 0;
    
    images.forEach((img, index) => {
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.zIndex = index === 0 ? '1' : '0';
    });
    
    setInterval(() => {
        images[currentIndex].style.zIndex = '0';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.zIndex = '1';
    }, 10000);
});