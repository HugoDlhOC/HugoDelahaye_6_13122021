import { photographer } from "../pages/photographer.js";

const modalLaunchBtn = document.getElementById("contact_me");
const modal = document.getElementById("contact_modal");
const closeModalCross = document.querySelector("#contact_modal header img");
const modalSend = document.querySelector("#send_form");
const header = document.querySelector("header");
const main = document.querySelector("#main");
const dataInput = document.querySelectorAll("input");
const photgraphInfos = document.querySelector(".photograph-header");
const spanNamePhotographer = document.querySelector("#name_photographer");

const firstFocusableElement = dataInput[0];
const lastFocusableElement = document.querySelector("#contact_modal header img");

function displayModal() {
  header.classList.add("decrease_opacity");
  main.classList.add("decrease_opacity");
  photgraphInfos.classList.add("decrease_opacity");
  spanNamePhotographer.innerHTML = photographer.name;
  modal.classList.replace("no_display" ,"display_block");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  photgraphInfos.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  closeModalCross.setAttribute("tabindex", "1");
  dataInput[0].focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.replace("display_block", "no_display");
  main.classList.replace("decrease_opacity","normal_opacity");
  header.classList.replace("decrease_opacity","normal_opacity");
  photgraphInfos.classList.replace("decrease_opacity", "normal_opacity");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  photgraphInfos.setAttribute("aria-hidden", "false");
  modal.setAttribute("arria-hidden", "true");

  //Affichage des données saisies à la console
  dataInput.forEach((data) => {
    console.log(data.value);
  });
}

//Si l'on clique sur la croix pour fermer le formulaire
closeModalCross.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

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

//Gestion de la navigation clavier de la modale pour que l'on ne sorte pas de cette dernière
document.addEventListener("keydown", (e) => {
  let isKeyTabPressed = e.key === "Tab";

  if (!isKeyTabPressed) {
    //Si tab n'est pas pressé
    return;
  }

  if (e.shiftKey) {
    //Si maj + tab est pressé (retour arrière)
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); //On met le focus sur le dernier élément
      e.preventDefault();
    }
  } else {
    //Si la touche tab est pressée
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
});
