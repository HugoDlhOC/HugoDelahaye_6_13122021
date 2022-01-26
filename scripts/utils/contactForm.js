const modalLaunchBtn = document.getElementById("contact_me");
const modal = document.getElementById("contact_modal");
const modalSend = document.querySelector("#send_form");
const header = document.querySelector("header");
const main = document.querySelector("#main");
const dataInput = document.querySelectorAll("input");
const photgraphInfos = document.querySelector(".photograph-header");

function displayModal() {
    header.style.opacity = "0.8";
    header.setAttribute("aria-hidden", "true");
    main.style.opacity = "0.8";
    main.setAttribute("aria-hidden", "true");
    photgraphInfos.style.opacity = "0.8";
    photgraphInfos.setAttribute("aria-hidden", "true");
	modal.style.display = "block";
    modal.setAttribute("arria-hidden", "false");
    modal.setAttribute("tabindex", "0");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    header.style.display = "flex";
    main.style.display = "block";
    header.style.opacity = "1";
    main.style.opacity = "1";
    photgraphInfos.style.opacity = "1";
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    photgraphInfos.setAttribute("aria-hidden", "false");
    modal.setAttribute("arria-hidden", "true");


    //Affichage des données saisies à la console
    dataInput.forEach((data) => {
        console.log(data.value);
    });
}

//Si l'on clique sur le bouton contactez-moi
modalLaunchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayModal();
});

//Si l'on clique sur le bouton envoyer
modalSend.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});



