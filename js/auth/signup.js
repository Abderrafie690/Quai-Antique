//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");



inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);


btnValidation.addEventListener("click", InscrireUtilisateur);


//Function permettant de valider tout le formulaire
function validateForm(){
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPreNom);
    const mailOK = validateMail(inputMail);
    const passwordOK = validatePassword( inputPassword);
    const passwordConfirmOK = validateConfirmationPassword( inputPassword, inputValidationPassword);

    if(nomOK && prenomOK && mailOK && passwordOK && passwordConfirmOK){
        btnValidation.disabled = false;

    }
    else{
        btnValidation.disabled = true;
    }
}
function validateMail(input){
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}
function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRequired(input){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "firstName": "tyty",
  "lastName": "tyty",
  "email": "tytyquaiAntique@mail.com",
  "password": "Azerty11"
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://quaiantiqueback.alwaysdata.net/api/registration", requestOptions)

  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
