    
/* function disappear () {
let boxMusicSBX  = document.querySelector('.box-img');
boxMusicSBX.classList.toggle('disappear', window.scrollY > 20);
};

function grow () {
let textMusicSBX  = document.querySelector('.tex-soundbox');
textMusicSBX.classList.toggle('grow', window.scrollY > 20);
};

function flatten () {
let containerMusicSBX  = document.querySelector('.logoSbx');
containerMusicSBX.classList.toggle('flatten', window.scrollY > 20);
};

function fixed () {
let headerBottomAnimation  = document.querySelector('.headerBottom');
headerBottomAnimation.classList.toggle('fixed', window.scrollY), 500;
};

// moguel esto esta comentado porque pase el search modal window a la vista search, si lo descomentas buguea el menu burguer
// MOGUEEEL

// const openModal = document.querySelector('.btnSearchOpenModal');
// const modal = document.querySelector('.search-modal_window');
// const closeModal = document.querySelector('.close-window')

// openModal.addEventListener('click', (e)=> {
//     e.preventDefault();
//     modal.classList.add('modal__show');
// });

// closeModal.addEventListener('click', (e)=> {
//     e.preventDefault();
//     modal.classList.remove('modal__show');
// })

window.addEventListener('scroll', disappear );
window.addEventListener('scroll', grow );
window.addEventListener('scroll', flatten );
window.addEventListener('scroll', fixed );
/*  for(let i = 0; i < animationShowBoxSb.length; i++ ){

 } */

//  _________________________________________________________________________________________________________

                                                // menu hamburguesa
//  _________________________________________________________________________________________________________

const menuContainer = document.querySelector('#menu-burguer');
const menuBurguerDesplegable = document.querySelector('#menuBurguerDesplegable');

menuContainer.addEventListener('click', (e) => {
    e.preventDefault();
    /* console.log("hola") */
    // alternamos estilos para el menu 
    menuBurguerDesplegable.style.display= "flex";
    
})

closeMenu.addEventListener('click', (e) => {
    e.preventDefault();
    // alternamos estilos para el menu 
    menuBurguerDesplegable.style.display= "none";
    
})





