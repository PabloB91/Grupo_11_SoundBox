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
boxMusicSBX.classList.toggle('disappear', window.scrollY>1);
};
function grow () {
let textMusicSBX  = document.querySelector('.tex-soundbox');
textMusicSBX.classList.toggle('grow', window.scrollY>1);
};
function flatten () {
let containerMusicSBX  = document.querySelector('.logoSbx');
containerMusicSBX.classList.toggle('flatten', window.scrollY>1);
};
function fixed () {
let headerBottomAnimation  = document.querySelector('.headerBottom');
headerBottomAnimation.classList.toggle('fixed', window.scrollY);
};

window.addEventListener('scroll', disappear );
window.addEventListener('scroll', grow );
window.addEventListener('scroll', flatten );
window.addEventListener('scroll', fixed );
/*  for(let i = 0; i < animationShowBoxSb.length; i++ ){

 } */