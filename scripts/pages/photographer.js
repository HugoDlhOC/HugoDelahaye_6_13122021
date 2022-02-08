import { Media } from "../class/Media.js";
import { Lightbox } from "../class/Lightbox.js";
import { getPhotographers } from "../pages/index.js";

/**
 * Afficher données des photographes (hors medias)
 * @param { any } photographer
 */
function displayDataPhotographerInfos(photographer) {
  const userCardDOM = photographer.HTMLForActualPhotographer();
  photographersSection.appendChild(userCardDOM);
}

/**
 * Calculer le nombre total de likes du photographe actuel, retourne la valeur calculée
 * @param { any } medias
 * @return { number }
 */
function calculValueTotalNumberOfLikes(medias) {
  const lengthMedias = medias.length;
  let arrayOfLikes = [length];
  let totalNumberOfLikes = 0;

  //Rangement de tous les likes dans un tableau
  for (let i = 0; i < lengthMedias; i++) {
    arrayOfLikes[i] = medias[i].likes;
  }

  //Calcul de tous les likes
  for (let j = 0; j < arrayOfLikes.length; j++) {
    totalNumberOfLikes = totalNumberOfLikes + arrayOfLikes[j];
  }

  return totalNumberOfLikes;
}

/**
 * Affiche les images/vidéos du photographe actuel
 * @param { any } medias
 */
function displayDataPhotographerMedia(medias) {
  mediasSection.innerHTML = ""; //Reset contenu
  medias.forEach((media) => {
    const userCardDOM = media.HTMLForAllMedia();
    mediasSection.appendChild(userCardDOM);
  });
}

/**
 * Fonction qui tri les médias par date, utilisation de la méthode sort()
 * @param { any } medias
 * @return { number }
 */
function sortMediasByDate(medias) {
  return medias.sort(function (mediaA, mediaB) {
    if (mediaA.date < mediaB.date) {
      return -1;
    }
    if (mediaA.date > mediaB.date) {
      return 1;
    }
  });
}

/**
 * Fonction qui tri les médias par popularité (nombre de likes) utilisation de la méthode sort()
 * @param { any } medias
 * @return { number }
 */
function sortMediasByPopularity(medias) {
  //LIKES
  return medias.sort(function (mediaA, mediaB) {
    return mediaA.likes - mediaB.likes;
  });
}

/**
 * Fonction qui tri les médias par titre (ordre alphabétique), utilisation de la méthode sort()
 * @param { any } medias
 * @return { number }
 */
function sortMediasByTitle(medias) {
  return medias.sort(function (mediaA, mediaB) {
    if (mediaA.title < mediaB.title) {
      return -1;
    }
    if (mediaA.title > mediaB.title) {
      return 1;
    }
  });
}

/**
 * Fonction qui gère l'affichage de la lightbox en créant un évènement click sur toutes les balises a, utilisation des méthodes de la classe Lightbox
 */
function initLightbox() {
  const lightbox = new Lightbox();
  linksMedias = Array.from(document.querySelectorAll(".media > a"));
  linksMedias.forEach((media) => {
    media.addEventListener("click", handleFunction);

    /**
     * Fonction pour l'évènement click, qui gère le comportement de la lightbox
     * @param { any } e
     */
    function handleFunction(e) {
      e.preventDefault();
      lightbox.openLightbox();
      lightbox.closeLightbox();
      lightbox.displayMediasLightbox(
        Array.from(photographer.medias),
        media.children[0].id,
        idPhotograph
      );
    }
  });
}

/**
 * Fonction qui donne la possibilité à l'utilisateur de pouvoir liker un média, en faisant attention que celui-ci n'est liké qu'une seule fois au maximum, que la valeur total du nombre de likes du photographe soit mise à jour en direct
 */

function configurationLikesUsers() {
  let spanValueTotalLikes = document.querySelector("#total_likes_photographer");
  let tabValueOfAllsLikes = toRecoverValueOfLikes(); //Récupération des valeurs des likes
  hearts = document.querySelectorAll(".description_media > .fa-heart"); //Récupération de tous les coeurs de la page
  hearts.forEach((heart, index) => {
    //Pour tous les likes, on ajoute un évènement click
    heart.addEventListener("click", handleFunctionLikes);

    function handleFunctionLikes() {
      let valueLike = parseInt(heart.previousElementSibling.innerHTML); //On récupère la valeur du like

      //Si la valeur du like correspond bien à la valeur donnée via le fichier json, il peut être liké, sinon cela veut dire qu'il a déja été liké, alors l'utilisateur peut supprimer son like
      if (valueLike === Number(tabValueOfAllsLikes[index])) {
        valueLike++;
        spanValueTotalLikes.innerHTML++;
        heart.previousElementSibling.innerHTML = valueLike.toString();
      } else if (valueLike === Number(tabValueOfAllsLikes[index]) + 1) {
        valueLike--;
        spanValueTotalLikes.innerHTML--;
        heart.previousElementSibling.innerHTML = valueLike.toString();
      }
    }
  });
}

/**
 * Fonction qui permet de récupérer les valeurs actuelles des likes de la page
 * Cette fonction retourne le tableau avec les valeurs des likes, utile à configurationLikesUsers()
 * @return { any[] }
 */
function toRecoverValueOfLikes() {
  const valueOFAllsLikes = document.getElementsByClassName("number_of_likes"); //Balises SPAN
  let tabValueOfAllsLikes = []; //Tableau où l'on va ranger les valeurs
  Array.from(valueOFAllsLikes).forEach((valueOfLike) => {
    tabValueOfAllsLikes.push(valueOfLike.innerHTML);
  });

  return tabValueOfAllsLikes;
}

/**
 * Cette fonction permet de récupérer les nouveaux likes (span) sur les médias ou likes retirés qu'il y a pu avoir sur la page
 * Cette fonction retourne dans un tableau avec le bonnes données de likes, utile pour les 3 éléments du menu
 * @return { any[] }
 */
function toRecoverValueOfLikesAfterChanges() {
  const valueOFAllsLikes = document.getElementsByClassName("number_of_likes");
  let tabValueOfAllsLikes = [];
  Array.from(valueOFAllsLikes).forEach((valueOfLike) => {
    tabValueOfAllsLikes.push(valueOfLike);
  });
  return tabValueOfAllsLikes;
}

/**
 * Cette fonction permet d'afficher les likes déja likés précédemment, évite un reset des valeurs lorsque l'on change l'organisation des médias avec le menu
 */
function displayLikedMedias(tabValueOfAllsLikes) {
  const spans = document.getElementsByClassName("number_of_likes");
  let tabValues = [];

  tabValueOfAllsLikes.forEach((value) => {
    tabValues.push(value.previousSibling.innerHTML);
  });

  Array.from(spans).forEach((value) => {
    let indexOfLet = tabValues.indexOf(value.previousSibling.innerHTML);
    value.innerHTML = tabValueOfAllsLikes[indexOfLet].innerHTML;
  });
}

//Récupération de l'id du photographe transmis dans l'url
const url = new URLSearchParams(window.location.search);
let idPhotograph = url.get("id");
idPhotograph = parseInt(idPhotograph);

//Récupérer tableau de données
const photographers = await getPhotographers();

const photographersSection = document.querySelector(".photograph-header");
export let photographer = photographers.find(
  (photographer) => photographer.id === idPhotograph
);

//Affichage des infos du photographe
displayDataPhotographerInfos(photographer);

//Partie medias
const mediasSection = document.querySelector(".media-container");

//Affichage des medias du photographe
displayDataPhotographerMedia(photographer.medias);

//MENU
//Affichage du menu lorsque l'on clique sur le bouton Popularité
//on récupère chaque lien permettant de filtrer les oeuvres
const filterLinks = document.querySelectorAll(".filter_link");
const sortMenuOpenDiv = document.querySelector(".sort_menu_open_hide");
const divButtonOpenMenu = document.getElementById("button_open_menu");
const ButtonOpenMenu = document.querySelector("#button_open_menu button");
const menuIconDown = document.getElementById("menu_icon_down");
const menuIconUp = document.getElementById("menu_icon_up");

//Si on clique sur le bouton, alors le menu s'affiche
divButtonOpenMenu.addEventListener("click", () => {
  sortMenuOpenDiv.removeAttribute("class", "sort_menu_open_hide");
  sortMenuOpenDiv.classList.add("sort_menu_open_display");
});

//Si on clique sur l'icone dédiée, alors le menu s'affiche
menuIconDown.addEventListener("click", () => {
  sortMenuOpenDiv.removeAttribute("class", "sort_menu_open_hide");
  sortMenuOpenDiv.classList.add("sort_menu_open_display");
});

//Si on clique sur un des 3 liens du menu, alors le menu disparait
filterLinks.forEach((filterLink) => {
  filterLink.addEventListener("click", () => {
    sortMenuOpenDiv.removeAttribute("class", "sort_menu_open_display");
    sortMenuOpenDiv.classList.add("sort_menu_open_hide");
  });
});
//Si on clique sur l'icone dédiée, alors le menu disparait
menuIconUp.addEventListener("click", () => {
  sortMenuOpenDiv.removeAttribute("class", "sort_menu_open_display");
  sortMenuOpenDiv.classList.add("sort_menu_open_hide");
});

//Lightbox
let linksMedias = undefined;
initLightbox();

//L'utilisateur peut aimer un media
//div nombre total likes + tarif photographe (fixedContainer)
//Nombre total de likes
const totalNbLikes = calculValueTotalNumberOfLikes(photographer.medias);
const objMedia = new Media(photographer.medias);
const DOMCard = objMedia.HTMLForFixedContainer(
  totalNbLikes,
  photographer.price
);
const fixedContainer = document.querySelector(".fixed_container");
fixedContainer.appendChild(DOMCard);

//likes
let hearts = undefined;
configurationLikesUsers();

// Array.from car querySelectorAll ne retourne pas un tableau mais un itérateur
Array.from(filterLinks).forEach((filter) => {
  // pour chaque filtre, on ajoute un listener au click
  filter.addEventListener("click", handleFunctionFilterEvent);
  // on récupère le type de filtre
  /**
   * Fonction pour l'évènement click pour le menu des filtres, récupération du type de filtre, et agissement en conséquence pour chaque
   * @param { any } event
   */
  function handleFunctionFilterEvent(event) {
    const type = event.target.getAttribute("data-filter-type");
    let sortedMedias = undefined;
    let tabValueOfAllsLikes = undefined;
    // on applique la fonction adaptée au type de filtre sélectionné
    if (type === "date") {
      // lancer une fonction qui va trier ton tableau medias (photographer.medias) en fonction du type de filtre sélectionné PAR SATE
      sortedMedias = sortMediasByDate(photographer.medias);
      ButtonOpenMenu.innerHTML = "Date";
      photographer = photographers.find(
        (photographer) => photographer.id === idPhotograph
      );
      tabValueOfAllsLikes = toRecoverValueOfLikesAfterChanges();
    } else if (type === "popularity") {
      sortedMedias = sortMediasByPopularity(photographer.medias);
      ButtonOpenMenu.innerHTML = "Popularité";
      photographer = photographers.find(
        (photographer) => photographer.id === idPhotograph
      );
      tabValueOfAllsLikes = toRecoverValueOfLikesAfterChanges();
    } else if (type === "title") {
      sortedMedias = sortMediasByTitle(photographer.medias);
      ButtonOpenMenu.innerHTML = "Titre";
      photographer = photographers.find(
        (photographer) => photographer.id === idPhotograph
      );
      tabValueOfAllsLikes = toRecoverValueOfLikesAfterChanges();
    }
    //une fois que notre tableau est trié, on peut reconstruire les éléments html dans le bon ordre :
    displayDataPhotographerMedia(sortedMedias);

    //Likes de l'utilisateur
    configurationLikesUsers();

    //FCT DE REMPLACEMENT VALEURS LIKÉES ICI
    displayLikedMedias(tabValueOfAllsLikes);

    //Lightbox
    initLightbox();
  }
});
