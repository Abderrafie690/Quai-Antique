const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "https://quaiantiquefront.alwaysdata.net/api/";



//Event listener pour déco//

signoutBtn.addEventListener("click", signout);



//GESTION DES ROLES//

function getRole(){
    return getCookie(RoleCookieName);
}

//GESTION DE LA DECONNEXION//
function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName)
    window.location.reload();
}

//GESTION DU TOKEN//
function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);
}

//GESTION DES COOKIES//

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//VERIFICATION DE LA CONNEXION//

function isConnected(){
    return !(getToken() == null || getToken == undefined);
}


//GESTION DES ROLES//


function showAndHideElementsForRoles (){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if(!userConnected || role != "ROLE_ADMIN" ){
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if(!userConnected || role != "ROLE_CLIENT"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}

function sanitizeHtml(text){
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

function getInfosUser(){
    console.log("Recuperaction des infos de utilizateurs...");

    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+"account/me", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log("Impossible de récupérer les informations utilisateur");
                throw new Error("Utilisateur non connecté");
            }
        })
        .then(result => {
            console.log("Utilisateur:", result);
            return result;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données utilisateur", error);
        });
}

