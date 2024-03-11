const slider = document.querySelector("#slider--inner");
let sliderSection = document.querySelectorAll(".img_sliderSection");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
/* const spanSelector = document.querySelector("#span__puse-play") */
const btnStop = document.querySelector("#div__btn-pause-play span");

btnStop.addEventListener("click", function () {
	const id = btnStop.getAttribute("data-id");

	//llamar a un servicio para actualizar si me gusta
	//toggleLike(id)
	if (btnStop.classList.contains("paused")) {
		btnStop.classList.toggle("paused");
		btnStop.innerText = "pause";
	} else {
		btnStop.classList.add("paused");
		btnStop.innerText = "play_arrow";
	}
});

/* const button = document.querySelector("button")

        // al hace r click en e; boton, tenemos que eejcutar una funcion 

        button.addEventListener("click", function () {
            const id = button.getAttribute('data-id')

            //llamar a un servicio para actualizar si me gusta
            //toggleLike(id)
            if (button.classList.contains("liked")) {
                button.classList.toggle("liked")
                button.innerText = "Like"
            } else {
                button.classList.add("liked")
                button.innerText = "disLike"
            }
        }) */
/* si (tocaron el boton pused){
    entonces vamos a escribir en el span play_arrow
}else{
    vamos a escribir pause
}
*/

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

btnRight.addEventListener("click", function () {
	nextLeft();
});

btnLeft.addEventListener("click", function () {
	nextRight();
});

/* el siguiente frfagmento de codigo es para que el slider se 
 reprodusca automaticamente. */

/*  if (play.addEventListener("click")){

     setInterval(function(){
         nextRight();
     }, 2000)
 }; */

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
//                            slider brands                                   |
//-----------------------------------------------------------------------------|

/* const copy = document.querySelector(".div__logos-slide").cloneNode(true);
document.querySelector(".div__brands-box").appendChild(copy);

document.addEventListener("DOMContentLoaded", function () {
	const logosSlide = document.querySelector(".div__logos-slide");
	const copy = logosSlide.cloneNode(true);
	document.querySelector(".div__brands-box").appendChild(copy);

	let scrollAmount = 0;

	function startAnimation() {
		scrollAmount += 1;
		if (scrollAmount % logosSlide.clientWidth === 0) {
			logosSlide.appendChild(
				logosSlide.firstElementChild.cloneNode(true)
			);
			logosSlide.scrollLeft = 0;
		} else {
			logosSlide.scrollLeft += 1;
		}
	}

	setInterval(startAnimation, 25);
}); */

//-----------------------------------------------------------------------------|
//                            NO FUNCIONARON                                   |
//-----------------------------------------------------------------------------|

