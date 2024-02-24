const goTopBtn = document.getElementById("goTop")

window.addEventListener( 'scroll', ()=>{
    scrollFunction();
})

function scrollFunction() {
    if (window.scrollY > 50) {
        goTopBtn.style.display = "flex";
        // goTopBtn.classList.add =  "show-button";
    } else {
        goTopBtn.style.display = "none";
        // goTopBtn.classList.remove = "show-button";
    }

}

goTopBtn.addEventListener('click', function () {
    window.scrollTo(0, 0);
})