var iconMenu = document.querySelector('.m+enu-burguer');
        
    iconMenu.addEventListener('click', function () {
        if (iconMenu.classList.contains('open')) {
            iconMenu.classList.remove('open');
        } else {
            iconMenu.classList.add('open');
        }
    }, false);