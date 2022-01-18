import { Media } from "../class/Media.js";
import { Image } from "../class/Media.js";
import { Video } from "../class/Media.js";
import { Photographer } from "../class/Photographer.js";
import { Lightbox } from "../class/Lightbox.js";
import { getPhotographers, init } from "../pages/index.js";

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
    let totalNumberOfLikes = 0;

    //Rangement de tous les likes dans un tableau
    for (let i = 0; i < lengthData; i++) {
            arrayOfLikes[ i ] = data[ i ].likes;
    }

    //Calcul de tous les likes
    for (let j = 0; j < arrayOfLikes.length; j++) {
            totalNumberOfLikes = totalNumberOfLikes + arrayOfLikes[ j ];
    }
    
    return totalNumberOfLikes;
}

//Fonction qui affiche les medias du photographe
function displayDataPhotographerMedia(medias){
    mediasSection.innerHTML = "";   //Reset contenu
    medias.forEach((media) => {
        const userCardDOM = media.HTMLForAllMedia();
        mediasSection.appendChild(userCardDOM);
    });
}

//Fonction qui trie les médias par date
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

//Fonction qui trie les médias par popularité -> avec nombre de likes
function sortMediasByPopularity(medias) {   //LIKES
    return medias.sort(function(mediaA, mediaB){
        return mediaA.likes - mediaB.likes;
    });
}

//Fonction qui trie les médias par titre, ordre alphabétique
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

//Lightbox
function configLightbox(){
    linksMedias = Array.from(document.querySelectorAll(".media > a"));
    linksMedias.forEach(media => {
        media.removeEventListener("click", handleFunction);
        media.addEventListener("click", handleFunction);
            
        function handleFunction(e){
            e.preventDefault();
            Lightbox.openLightbox();
            Lightbox.closeLightbox();
            Lightbox.displayMediasLightbox(Array.from(photographer.medias), media.children[0].id, IdPhotograph);
        }
    });
}
function likesByUsers(){
    let valueTotalLikes = document.querySelector("#total_likes_photographer");
    hearts = document.querySelectorAll(".description_media > .fa-heart");
    console.log(valueTotalLikes);
    hearts.forEach(heart => {
        heart.addEventListener("click", handleFunctionLikes);
        function handleFunctionLikes(){
            console.log(heart.previousElementSibling);
            let valueLike = parseInt(heart.previousElementSibling.innerHTML);
            valueLike++;
            valueTotalLikes.innerHTML++;
            heart.previousElementSibling.innerHTML = valueLike.toString();
            console.log(valueTotalLikes);
            heart.removeEventListener("click", handleFunctionLikes);
        }
    });
}

//Récupération de l'id du photographe transmis dans l'url
let url = new URLSearchParams(window.location.search);
let IdPhotograph = url.get('id');
IdPhotograph = parseInt(IdPhotograph);

//Récupérer tableau de données
let photographers = await getPhotographers();

const photographersSection = document.querySelector(".photograph-header");
let photographer = photographers.find((photographer) => photographer.id === IdPhotograph);
//console.log(photographer.medias[0].title);


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
//Lightbox
let linksMedias = undefined;
configLightbox();

//L'utilisateur peut aimer un media
//div nombre total likes + tarif photographe (fixedContainer)
//Nombre total de likes
const totalNbLikes = totalNumberOfLikes(photographer.medias);
let objMedia = new Media(photographer.medias);
const DOMCard = objMedia.HTMLForFixedContainer(totalNbLikes, photographer.price);
const fixedContainer = document.querySelector(".fixed_container");
fixedContainer.appendChild(DOMCard);

let hearts = undefined;
likesByUsers();


// Array.from car querySelectorAll ne retourne pas un tableau mais un itérateur
Array.from(filterLinks).forEach((filter) => {
    // pour chaque filtre, on ajoute un listener au click
    filter.addEventListener("click", handleFunctionFilterEvent);
        // on récupère le type de filtre
        function handleFunctionFilterEvent(event){
            const type = event.target.getAttribute('data-filter-type');
            let sortedMedias;
            // on applique la fonction adaptée au type de filtre sélectionné
            if(type === "date") {
                // lancer une fonction qui va trier ton tableau medias (photographer.medias) en fonction du type de filtre sélectionné PAR SATE
                sortedMedias = sortMediasByDate(photographer.medias);
                buttonOpenMenu.innerHTML="Date";
                photographer = photographers.find((photographer) => photographer.id === IdPhotograph);
                console.log(photographer.medias);
            }
            else if(type === "popularity") {
                sortedMedias = sortMediasByPopularity(photographer.medias);
                buttonOpenMenu.innerHTML="Popularité";
                photographer = photographers.find((photographer) => photographer.id === IdPhotograph);
                console.log(photographer.medias);
            }
            else if(type === "title"){
                sortedMedias = sortMediasByTitle(photographer.medias);
                buttonOpenMenu.innerHTML="Titre";
                photographer = photographers.find((photographer) => photographer.id === IdPhotograph);
                console.log(photographer.medias);
            }
            // une fois que notre tableau est trié, on peut reconstruire les éléments html dans le bon ordre :
            // d'abord, on efface le contenu de mediasSection
            // puis on reconstruit l'html pour chaque media trié :
            displayDataPhotographerMedia(sortedMedias);

            //Lightbox
            configLightbox();

            //Likes de l'utilisateur 
            let valueTotalLikes = document.querySelector("#total_likes_photographer");
            valueTotalLikes.innerHTML = totalNbLikes;
            likesByUsers();
        }
});








