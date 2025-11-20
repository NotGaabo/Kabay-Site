const slides = document.getElementById("slides");
const dot1 = document.getElementById("dot1");
const dot2 = document.getElementById("dot2");

let currentSlide = 0;
function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dot1.classList.toggle("bg-blue-600", currentSlide === 0);
    dot1.classList.toggle("bg-gray-300", currentSlide !== 0);
    dot2.classList.toggle("bg-blue-600", currentSlide === 1);
    dot2.classList.toggle("bg-gray-300", currentSlide !== 1);
}
document.getElementById("nextBtn").addEventListener("click", () => {
    currentSlide = Math.min(currentSlide + 1, 1);
    updateSlider();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateSlider();
});

    // Swipe móvil
let touchStartX = 0;

slides.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) currentSlide = Math.min(currentSlide + 1, 1);
    else if (touchEndX - touchStartX > 50) currentSlide = Math.max(currentSlide - 1, 0);
    updateSlider();
});