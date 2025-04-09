'use strict';








const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {

    preloader.classList.add("loaded");
    document.body.classList.add("loaded");

});


/** add event listener on multiple elements */

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i ++) {
        elements[i].addEventListener(eventType, callback);
    }
}




/** NAVBAR */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


/** HEADER AND BACK TOP BTN*/


let lastScrollPos = 0;
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]")

const hideHeader =  function () {
    let currentScrollPos = window.scrollY;
    if (currentScrollPos > lastScrollPos && currentScrollPos > 50) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScrollPos = currentScrollPos
};

window.addEventListener("scroll", function (){
    if (window.scrollY > 50){
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
    hideHeader();
});


/** HERO SLIDER */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");


let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
} 

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const sliderPrev = function (){
    if (currentSlidePos <= 0){
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", sliderPrev);


/** AUTO SLIDE */

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval (function (){
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function (){
    clearInterval (autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);https://file+.vscode-resource.vscode-cdn.net/Users/user/.vscode/extensions/cirlorm.mobileview-0.0.7/media/refresh-outline.svg

window.addEventListener("load", autoSlide);


/** PARALLAX EFFECT*/

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

x = (event.clientX / window.innerWidth * 10) - 5;
y = (event.clientY / window.innerHeight * 10) - 5;



// REVERSE the number eg. 20 --> -20, -5 ---> 5

x = x - (x * 2);
y = y - (y * 2);

for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
}

});