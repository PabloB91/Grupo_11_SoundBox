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

const slider = document.querySelector("#slider--inner");
let sliderSection = document.querySelectorAll(".img_sliderSection");
let sliderSectionLast = sliderSection[sliderSection.length -1]

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-rigth");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

function nextRight(){
    let sliderSectionFirst = document.querySelectorAll(".img_sliderSection")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function (){
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500)
};

function nextLeft(){
    let sliderSection = document.querySelectorAll(".img_sliderSection");
    let sliderSectionLast = sliderSection[sliderSection.length -1]
    slider.style.marginLeft = "0%";
    slider.style.transition = "all 0.5s";
    setTimeout(function (){
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500)
};

btnLeft.addEventListener("click", function(){
    nextLeft();
});

btnRight.addEventListener("click", function(){
    nextRight();
});

/* setInterval(function(){
    nextRight();
}, 10000) */