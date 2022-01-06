import { Media } from "../class/Media.js";
import { Image } from "../class/Media.js";
import { Video } from "../class/Media.js";
import { Photographer } from "../class/Photographer.js";
import { getPhotographers } from "../pages/index.js";

/*
@todo déplacer toutes les fonctions en haut
@todo nommage des variables et fonctions : toujours utiliser du camelCase (ex : IdPhotographer => idPhotographer)
 */

//Afficher les données récupérées en HTML
function displayDataPhotographerInfos(photographer) {
        const userCardDOM = photographer.HTMLForActualPhotographer();
        photographersSection.appendChild(userCardDOM);
}

//Calculer l'ensemble des likes des photographes
//Retourne le nombre total de likes
function totalNumberOfLikes(data) {
        const lengthData = data.length;
        let arrayOfLikes = [ length ];
        let result = 0;

        //Rangement de tous les likes dans un tableau
        for (let i = 0; i < lengthData; i++) {
                arrayOfLikes[ i ] = parseInt(data[ i ].likes);
        }

        //Calcul de tous les likes
        for (let j = 0; j < arrayOfLikes.length; j++) {
                result = result + arrayOfLikes[ j ];
        }
        result = String(result);
        return result;
}

//Récupération de l'id du photographe transmis dans l'url
let url = new URLSearchParams(window.location.search);
let IdPhotograph = url.get('id');
IdPhotograph = parseInt(IdPhotograph);

//Récupérer tableau de données
let photographers = await getPhotographers();

const photographersSection = document.querySelector(".photograph-header");
const photographer = photographers.find((photographer) => photographer.id === IdPhotograph);
//console.log(photographer.medias[0].title);


//Affichage des infos du photographe
displayDataPhotographerInfos(photographer);

//Partie medias 
const mediasSection = document.querySelector(".media-container");
function displayDataPhotographerMedia(medias){
    mediasSection.innerHTML = "";   //Reset contenu
    medias.forEach((media) => {
        const userCardDOM = media.HTMLForAllMedia();
        mediasSection.appendChild(userCardDOM);
    });
}
//Affichage des medias du photographe
displayDataPhotographerMedia(photographer.medias);


//MENU
//Affichage du menu lorsque l'on clique sur le bouton Popularité
//on récupère chaque lien permettant de filtrer les oeuvres
const filterLinks = document.querySelectorAll(".filter_link");
const sortMenuOpenDiv = document.querySelector(".sort_menu_open");
const buttonOpenMenu = document.getElementById("button_open_menu");
const menuIconDown = document.getElementById("menu_icon_down");
const menuIconUp = document.getElementById("menu_icon_up");

//Si on clique sur le bouton, alors le menu s'affiche
buttonOpenMenu.addEventListener("click", (e) => {
    sortMenuOpenDiv.style.display="flex";
});

//Si on clique sur l'icone dédiée, alors le menu s'affiche
menuIconDown.addEventListener("click", (e) => {
    sortMenuOpenDiv.style.display="flex";
});

//Si on clique sur un des 3 liens du menu, alors le menu disparait
filterLinks.forEach((filterLink) => {
    filterLink.addEventListener("click", (e) => {
        sortMenuOpenDiv.style.display="none";
    });
});
//Si on clique sur l'icone dédiée, alors le menu disparait
menuIconUp.addEventListener("click", (e) => {
    sortMenuOpenDiv.style.display="none";
});
/*
<div>
<a class="filter" data-filter-type="date" href="">Date</a>
<a class="filter" data-filter-type="popularity" href="">Popularité</a>
</div>
*/


// Array.from car querySelectorAll ne retourne pas un tableau mais un itérateur
Array.from(filterLinks).forEach((filter) => {
    // pour chaque filtre, on ajoute un listener au click
    filter.addEventListener("click", (event) => {
        // on récupère le type de filtre
        const type = event.target.getAttribute('data-filter-type');
        let sortedMedias;
        // on applique la fonction adaptée au type de filtre sélectionné
        if(type === "date") {
            // lancer une fonction qui va trier ton tableau medias (photographer.medias) en fonction du type de filtre sélectionné PAR SATE
            sortedMedias = sortMediasByDate(photographer.medias);
            buttonOpenMenu.innerHTML="Date";
        }
        else if(type === "popularity") {
            sortedMedias = sortMediasByPopularity(photographer.medias);
            buttonOpenMenu.innerHTML="Popularité";
        }
        else if(type === "title"){
            sortedMedias = sortMediasByTitle(photographer.medias);
            buttonOpenMenu.innerHTML="Titre";
        }
        // une fois que notre tableau est trié, on peut reconstruire les éléments html dans le bon ordre :
        // d'abord, on efface le contenu de mediasSection
        // puis on reconstruit l'html pour chaque media trié :
        displayDataPhotographerMedia(sortedMedias);
    })
})
console.log(photographer);
console.log(photographer.medias[0].likes);

let tabMedias = photographer.medias;

console.log(tabMedias);

function sortMediasByDate(medias) {
    return medias.sort(function(mediaA, mediaB){
        if(mediaA.date < mediaB.date){
            return -1;
        }
        if(mediaA.date > mediaB.date){
            return 1;
        }
    });
}

function sortMediasByPopularity(medias) {   //LIKES
    return medias.sort(function(mediaA, mediaB){
        return mediaA.likes - mediaB.likes;
    });
}
function sortMediasByTitle(medias) {
    return medias.sort(function(mediaA, mediaB){
        if(mediaA.title < mediaB.title){
            return -1;
        }
        if(mediaA.title > mediaB.title){
            return 1;
        }
    });
}














/*
//Évènement sur le menu de tri pour voir quand tel élément est sélectionné
const selectedMenu = document.getElementById("menu");

selectedMenu.addEventListener("change", (e) =>{
        const selectedMenuValue = selectedMenu.value;
        console.log(selectedMenuValue);
});

//Récupération des likes des différents médias du photographe actuel
//Images*/


/*
let objMedia = new Media(allDataMediaPhtgs);
let nbrLikes = totalNumberOfLikes(allDataMediaPhtgs);
objMedia.HTMLForFixedContainer(nbrLikes, )*/

