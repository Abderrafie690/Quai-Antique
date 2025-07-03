const inputEmail= document.getElementById("EmailInput");
const inputPassword= document.getElementById("PasswordInput");
const btnSignin= document.getElementById("btnSignin");
const formSignin = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    let dataForm = new FormData(formSignin);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("Email"),
        "password": dataForm.get("Password")
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8001/api/login", requestOptions)
    .then(response => {
        
        if (response.ok){
            return response.json();
        }
        else{
        inputEmail.classList.add("is-invalid");
        inputPassword.classList.add("is-invalid");
      }
    })
    .then(result =>{
      const token = result.apiToken;
      setToken(token);
      //placer ce token en cookie

     setCookie(RoleCookieName, result.roles[0], 7);
      window.location.replace("/");
    })
    .catch((error) => console.error(error));
}


