
function hide() {
    document.getElementById("desplegable").style.display = "none";

}

function show() {
    document.getElementById("desplegable").style.display = "block";


    // var desplegable = document.getElementById("desplegable");
    // desplegable.addClass('productCart-open')
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
// function openWindow(id) {
//     const windows = document.getElementsByClassName('window');
//     for (let i = 0; i < windows.length; i++) {
//       if (windows[i].id === id) {
//         windows[i].style.display = 'flex';
//       } else {
//         windows[i].style.display = 'none';
//       }
//     }
//   }
  
//   function closeWindow(id) {
//     const windowToClose = document.getElementById(id);
//     if (windowToClose) {
//       windowToClose.style.display = 'none';
//     }
//   }
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

