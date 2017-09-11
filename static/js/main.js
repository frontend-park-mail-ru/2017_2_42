import '../css/main.css'
import '../css/form-add-username.css'
import '../css/form-login.css'
import '../css/form-signup.css'
// import '../css/game-container.css'
import "html-loader!../index.html"
import "./auth/signUpNewUser"


let mql = window.matchMedia("(orientation: portrait)");

if(mql.matches) {
    console.log("Turn please");
} else {
    console.log("OK")
}

// Прослушка события изменения ориентации
mql.addListener(function(m) {
    if(m.matches) {
        console.log("Turn please");    }
    else {
        console.log("OK")
    }
});