const modal = document.getElementById("contact_modal");
const modalSend = document.querySelector("#send_form");
const header = document.querySelector("header");
const main = document.querySelector("#main");
const dataInput = document.querySelectorAll("input");


function displayModal() {
	modal.style.display = "block";
    header.style.display = "none";
    main.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    header.style.display = "flex";
    main.style.display = "block";


    //Affichage des données saisies à la console
    dataInput.forEach((oui) => {
        console.log(oui.value);
    });
}

//Si l'on clique sur le bouton envoyer
modalSend.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});



