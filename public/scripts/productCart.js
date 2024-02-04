
function hide() {
    document.getElementById("desplegable").style.display = "none";
    // document.getElementById("favoritos").style.display = "block";

}

function show() {
    document.getElementById("desplegable").style.display = "block";
    // document.getElementById("carrito").style.display = "block";

}


// ________________________________________________________________________________________________
//                                      ORDENAR POR ALFABETO
// ________________________________________________________________________________________________

function ordenarAlfabeticamente() {
    // Obtener el elemento desplegable
    const desplegable = document.getElementById("desplegable");
  
    // Obtener los elementos .card dentro del desplegable
    const cards = Array.from(desplegable.getElementsByClassName("card"));
  
    // Ordenar las tarjetas alfabéticamente
    cards.sort((a, b) => {
      const aName = a.getElementsByClassName("nombre-marca")[0].getElementsByTagName("h5")[0].innerText;
      const bName = b.getElementsByClassName("nombre-marca")[0].getElementsByTagName("h5")[0].innerText;
  
      return aName.localeCompare(bName);
    });
  
    // Limpiar el desplegable
    desplegable.innerHTML = "";
  
    // Agregar las tarjetas ordenadas al desplegable
    cards.forEach(card => {
      desplegable.appendChild(card);
    });
  }






// ________________________________________________________________________________________________
// const orderByAlphabetical = (card, getter, order ="asc") => {
//     card.sort((a, b) => {
//         const first = gatter(a);
//         const second = gatter(b);

//         const compare = first.localeCompare(second);
//         return order === "asc" ? compare : -compare;

//     });
//     return card;

// }

// const productsByAlphabetic = orderByAlphabetical (card, product => product.nombre)

// console.log(productsByAlphabetic)

// function ordenarPalabras() {
//     let ol = document.getElementById("desplegable");
//     ol.innerHTML = "";
//     let cadena = document.getElementById("text1").value;
//     let palabrasOrdenadas = cadena.trim();
//     palabrasOrdenadas.sort();

//     for(let i  = 0; i < palabrasOrdenadas.length; i++) {
//         const li = document.createElement("li");
//         li.innerHTML = palabrasOrdenadas[i];
//         ol.appendChild(li);
//     }
//     document.getElementById("text1").select();
// }
// ________________________________________________________________________________________________
//                             incrementador de cantidad de cada producto
// ________________________________________________________________________________________________

// let starValue = 1;
// let disabledBtn = document.getElementById("disabledBtn");
// disabledBtn.disabled = true;

// function addValueFunction(valuePar) {
//     document.getElementById("amount").value;

//     if (valuePar.value == 'increase') {
//         starValue++;
//     } else {
//         starValue--;
//     }
//     document.getElementById("amount").textContent = starValue;

//     if (starValue == 1) {
//         disabledBtn.disabled = true;
//     } else {
//         disabledBtn.disabled = false;
//     }
// }

// _______________________________________________________________________________________________

function decrementar(id) {
    const cantidadElement = document.getElementById(`cantidad-${id}`);
    let cantidad = parseInt(cantidadElement.innerText, 10);
    if (cantidad > 1) {
        cantidad--;
        cantidadElement.innerText = cantidad;
        // Puedes enviar una solicitud al servidor para actualizar la cantidad allí
    }
}

function incrementar(id, stock) {
    const cantidadElement = document.getElementById(`cantidad-${id}`);
    let cantidad = parseInt(cantidadElement.innerText, 10);
    if (cantidad < stock) {
        cantidad++;
        cantidadElement.innerText = cantidad;

    } else {
        alert("no hay stock suficiente");
        // Puedes enviar una solicitud al servidor para actualizar la cantidad allí
    }
}

