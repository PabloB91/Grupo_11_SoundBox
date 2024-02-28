
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

