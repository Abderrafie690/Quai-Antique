const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");



btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    if(mailInput.value == "test@mail.com" && passwordInput.value == "123"){
        alert("vous êtes connecté");

        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);

        setCookie(RoleCookieName, "client", 7); // ✅ GUARDAR ANTES DE REDIRIGIR

        window.location.replace("/"); // ✅ REDIRECCIÓN AL FINAL
    } else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}
