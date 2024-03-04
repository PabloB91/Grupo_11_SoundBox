const slider = document.querySelector("#slider--inner");
let sliderSection = document.querySelectorAll(".img_sliderSection");
let sliderSectionLast = sliderSection[sliderSection.length - 1]

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
const btnSopt = document.querySelector("#btn-stop")

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

function nextLeft() {
    let sliderSectionFirst = document.querySelectorAll(".img_sliderSection")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = " 800ms";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 800)
};

function nextRight() {
    let sliderSection = document.querySelectorAll(".img_sliderSection");
    let sliderSectionLast = sliderSection[sliderSection.length - 1]
    slider.style.marginLeft = "0";
    slider.style.transition = " 800ms";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 800)
};

btnRight.addEventListener("click", function () {
    nextRight();
});

btnLeft.addEventListener("click", function () {
    nextLeft();
});


/* el siguiente frfagmento de codigo es para que el slider se 
 reprodusca automaticamente. */

/*  if (play.addEventListener("click")){

     setInterval(function(){
         nextRight();
     }, 2000)
 }; */


/**Funcion para las flechas de desplazamiento delas cards */
const rightBtnSliderCards = document.querySelector("div#btnsCards-right")
const leftBtnSliderCards = document.querySelector("div#btnsCards-left")
const containerCards = document.querySelector("#div_cards--scrolling")

//scroll left

rightBtnSliderCards.addEventListener("click", () => {
    containerCards.scrollLeft += 800;
})
leftBtnSliderCards.addEventListener("click", () => {
    containerCards.scrollLeft -= 800;
})


//-----------------------------------------------------------------------------|
//                            slider brands                                   |
//-----------------------------------------------------------------------------|



document.addEventListener("DOMContentLoaded", function () {
    const logosSlide = document.querySelector(".logos-slide");
    const copy = logosSlide.cloneNode(true);
    document.querySelector(".brands-box").appendChild(copy);

    let scrollAmount = 0;

    function startAnimation() {
        scrollAmount += 1;
        if (scrollAmount % logosSlide.clientWidth === 0) {
            logosSlide.appendChild(logosSlide.firstElementChild.cloneNode(true));
            logosSlide.scrollLeft = 0;
        } else {
            logosSlide.scrollLeft += 1;
        }
    }

    setInterval(startAnimation, 25);
});


//-----------------------------------------------------------------------------|
//                            NO FUNCIONARON                                   |
//-----------------------------------------------------------------------------|

/* window.onscroll = function(){
    if(document.documentElement.scrollTop > 25){
        document.querySelector(".go-top-container")
        .classList.add("show");
    }else{
        document.querySelector(".go-top-container")
        .classList.remove("show");
    }

}

document.querySelector(".go-top-container")
.addEventListener('click', ()=>{
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    })

}) */