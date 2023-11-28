import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io.connect(document.location.host);

function Connect(exists) {
    if(exists){
        alert('pseudo déja utilisé')
    }
    let pseudo = document.querySelector("#pseudo").value;
    if (pseudo !== null) {
        socket.emit('pseudo:newUser', pseudo); 
    }
    
}
document.querySelector("#btn_speudo").addEventListener('click', () => Connect(false));

socket.on('pseudo:newUser:exists', () =>{ Connect(true)})
socket.on('pseudo:newUser:connected', () => {
    document.querySelectorAll(".modal").forEach((elm) => {
        elm.style.display="none";

    })

    document.querySelectorAll(".connection").forEach((elm) => {
        elm.style.display="none";

    })

    document.querySelectorAll(".chat").forEach((elm) => {
        elm.style.display="block";

    })

   

})
