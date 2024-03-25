window.addEventListener("load", function(){

    let form = document.querySelector(".main-login_form form")

    form.addEventListener("submit", function(e){

        const errores = [];

        const name = document.getElementById("user-name");
        if(name.value === ""){
            errores.push("El nombre no puede estar vacío.")
        };

        const last_name = document.getElementById("last-name");
        if(last_name.value === ""){
            errores.push("El apellido no puede estar vacío.")
        };

        const email = document.getElementById("e-mail");
        if(email.value === ""){
            errores.push("El email no puede estar vacío.");
        }

        const password = document.getElementById("password");

            const hasUppercase = /[A-Z]/;
            const hasSpecialCharacter = /[!@#$%^&/_*]/;
            const hasLowercase = /[a-z]/;

        if(password.value === ""){
            errores.push("El password no puede estar vacío.");
        }else if(password.length < 8){
            errores.push("La contraseña debe tener al menos 8 caracteres");
        }else if(!password.value.includes(hasUppercase)){
            errores.push("La contraseña debe tener un al menos una mayuscula.")
        }else if(!password.value.includes(hasLowercase)){
            errores.push("La contraseña debe tener un al menos una minuscula.")
        }else if(!password.value.includes(hasSpecialCharacter)){
            errores.push("La contraseña debe tener un al menos un caracter especial.")
        };

        const confirmPassword = document.getElementById("confirm-password");
        if(confirmPassword.value !== password){
            errores.push("La contraseña debe ser la misma")
        }


        if(errores.length > 0){
            e.preventDefault();

            const ulErrores = document.querySelector("div.errores ul")

            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li> " + errores[i] + "</li>"
            }
        }
    })
})