//--Script para modificar elementos dentro de la vista de perfil de usuario--//


function show() {    //--> Función para esconder los datos del usuario y mostrar el formulario de editar usuario 
    console.log("show");
    document.getElementById("edit-user-form").style.display = "flex";
    document.getElementById("user-description").style.display = "none"; 
    
}

function hide() {       //--> Función para esconder el formulario de editar usuario y mostrar los datos del usuario
    console.log("hide");
    document.getElementById("edit-user-form").style.display = "none";
    document.getElementById("user-description").style.display = "flex"; 

}
