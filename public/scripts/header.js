/* document.addEventListener('DOMContentLoaded', function() {
    let link_usuario= document.querySelector('.account')
    //console.log(link_usuario.href);
})
 */

/* var iconMenu = document.querySelector('.m+enu-burguer');
        
    iconMenu.addEventListener('click', function () {
        if (iconMenu.classList.contains('open')) {
            iconMenu.classList.remove('open');
        } else {
            iconMenu.classList.add('open');
        }
    }, false); */

    
function disappear () {
let boxMusicSBX  = document.querySelector('.box-img');
boxMusicSBX.classList.toggle('disappear', window.scrollY);
};

function grow () {
let textMusicSBX  = document.querySelector('.tex-soundbox');
textMusicSBX.classList.toggle('grow', window.scrollY);
};

function flatten () {
let containerMusicSBX  = document.querySelector('.logoSbx');
containerMusicSBX.classList.toggle('flatten', window.scrollY);
};

function fixed () {
let headerBottomAnimation  = document.querySelector('.headerBottom');
headerBottomAnimation.classList.toggle('fixed', window.scrollY);
};

const openModal = document.querySelector('.btnSearchOpenModal');
const modal = document.querySelector('.search-modal_window');
const closeModal = document.querySelector('.close-window')

openModal.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.classList.add('modal__show');
});

closeModal.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.classList.remove('modal__show');
})

window.addEventListener('scroll', disappear );
window.addEventListener('scroll', grow );
window.addEventListener('scroll', flatten );
window.addEventListener('scroll', fixed );
/*  for(let i = 0; i < animationShowBoxSb.length; i++ ){

 } */

//  _________________________________________________________________________________________________________

                                                // menu hamburguesa de aqui para abajo.
//  _________________________________________________________________________________________________________

let menuContainer = document.querySelector('#menu-burguer');
let menuBurguerDesplegable = document.querySelector('#menuBurguerDesplegable');

menuContainer.addEventListener('click', (e) => {
    e.preventDefault();
    // alternamos estilos para el menu 
    menuBurguerDesplegable.style.display= "flex";
    
})

closeMenu.addEventListener('click', (e) => {
    e.preventDefault();
    // alternamos estilos para el menu 
    menuBurguerDesplegable.style.display= "none";
    
})




// function hide() {
//     document.getElementById("desplegable").style.display = "none";
//     document.getElementById("labels-ordenador").style.display = "none";
// }

// function show() {
//     document.getElementById("menuBurguerDesplegable").style.display.toggle('flex')
// }





//  ________________________________________________________________________________________________________
//                                            search-bar ventana modal
//  ---------------------------------------------------------------------------------------------------------
document.addEventListener("keyup", (e) => {
    if(e.target.matches("#buscador")){
        if (e.key === "Escape") e.target.value = "";

        const cards = Array.from(document.querySelectorAll(".cardTosearch"));

        cards.forEach(product => {
            const text = product.textContent.toLowerCase();
            const searchValue = e.target.value.toLowerCase();
            product.textContent.toLowerCase().includes(searchValue)
                ? product.classList.remove("filtro")
                : product.classList.add("filtro");
        });

        // Ordenar las cards según la cantidad de letras en común
        cards.sort((a, b) => {
            const textA = a.textContent.toLowerCase();
            const textB = b.textContent.toLowerCase();
            const searchValue = e.target.value.toLowerCase();

            const matchCountA = countMatchingLetters(textA, searchValue);
            const matchCountB = countMatchingLetters(textB, searchValue);

            // Ordenar en orden descendente (mayor coincidencia primero)
            return matchCountB - matchCountA;
        });

        // Mover las cards ordenadas al contenedor
        const cardsContainer = document.querySelector(".cards-container");
        cards.forEach(card => cardsContainer.appendChild(card));
    }
});

function countMatchingLetters(str, searchValue) {
    // Función para contar la cantidad de letras coincidentes
    let count = 0;
    for (let char of searchValue) {
        if (str.includes(char)) {
            count++;
        }
    }
    return count;
}

