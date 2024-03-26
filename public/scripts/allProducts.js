
const closeDropdown = document.querySelector('.closeDropDown');

const tituloContainer = document.querySelector('.barra-titulo');
let tituloOrdenador = document.getElementById("titulo-ordenador");
let ordenador = document.querySelector(".dropdown-ordenador");

tituloOrdenador.addEventListener("click", () => {
    tituloOrdenador.style.animation = " 1.3s titleAnimation ease-in";
    tituloOrdenador.style.display = "none";
    ordenador.style.display = "flex";
    closeDropdown.style.display = "flex"


});

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        tituloContainer.style.top = "0";
        ordenador.style.height = "90vh";
        closeDropdown.style.top = "10vh";


    } else {
        tituloContainer.style.top = "30vh";
        ordenador.style.height = "60vh";
        closeDropdown.style.top = "40vh"

    }
}) 

closeDropdown.addEventListener("click", () => {
    tituloOrdenador.style.display = "flex";
    tituloOrdenador.style.animation = "none";

    ordenador.style.display = "none";
    closeDropdown.style.display = "none";


});
