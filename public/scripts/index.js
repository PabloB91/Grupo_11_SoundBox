const slider = document.querySelector("#slider--inner");
let sliderSection = document.querySelectorAll(".img_sliderSection");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
const btnStop = document.querySelector("#div__btn-pause-play span");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

function nextLeft() {
	let sliderSectionFirst = document.querySelectorAll(".img_sliderSection")[0];
	slider.style.marginLeft = "-200%";
	slider.style.transition = " 800ms";
	setTimeout(function () {
		slider.style.transition = "none";
		slider.insertAdjacentElement("beforeend", sliderSectionFirst);
		slider.style.marginLeft = "-100%";
	}, 800);
}

function nextRight() {
	let sliderSection = document.querySelectorAll(".img_sliderSection");
	let sliderSectionLast = sliderSection[sliderSection.length - 1];
	slider.style.marginLeft = "0";
	slider.style.transition = " 800ms";
	setTimeout(function () {
		slider.style.transition = "none";
		slider.insertAdjacentElement("afterbegin", sliderSectionLast);
		slider.style.marginLeft = "-100%";
	}, 800);
}

btnStop.addEventListener("click", function () {
	const id = btnStop.getAttribute("data-id");

	//llamar a un servcio
	//toggleLike(id)
	if (btnStop.classList.contains("paused")) {
		btnStop.classList.toggle("paused");
		btnStop.innerText = "pause";
		setInterval(function () {}, 15000);
	} else{
		btnStop.classList.add("paused");
		btnStop.innerText = "play_arrow";
		setInterval(function () {
			nextRight();
		}, 5000);
		setInterval;
	}
});

btnRight.addEventListener("click", function () {
	nextLeft();
});

btnLeft.addEventListener("click", function () {
	nextRight();
});

/**Funcion para las flechas de desplazamiento delas cards */
const rightBtnSliderCards = document.querySelector("div#btnsCards-right");
const leftBtnSliderCards = document.querySelector("div#btnsCards-left");
const containerCards = document.querySelector("#div_cards--scrolling");

//scroll left
rightBtnSliderCards.addEventListener("click", () => {
	containerCards.scrollLeft += 800;
});
leftBtnSliderCards.addEventListener("click", () => {
	containerCards.scrollLeft -= 800;
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
