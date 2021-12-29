import { Media } from "../class/Media.js";
import { Image } from "../class/Media.js";
import { Video } from "../class/Media.js";
import { Photographer } from "../class/Photographer.js";
import { getPhotographers } from "../pages/index.js";

//Récupération de l'id du photographe transmis dans l'url
let queryStringUrlId = window.location.search;
//Il faut maintenant supprimer le ?
let IdPhotograph = queryStringUrlId.slice(4);

//Récupérer tableau de données
let dataPhts = await getPhotographers();

//Obtenir seulement les données du photographe actuel
let dataActualPhotographer;

switch(IdPhotograph){
        case "243":
                dataActualPhotographer = dataPhts.photographers[0];
                break;
        case "930":
                dataActualPhotographer = dataPhts.photographers[1];
                break;
        case "82": 
                dataActualPhotographer = dataPhts.photographers[2];
                break;
        case "527":
                dataActualPhotographer = dataPhts.photographers[3];
                break;
        case "925":
                dataActualPhotographer = dataPhts.photographers[4];
                break;
        case "195": 
                dataActualPhotographer = dataPhts.photographers[5];
                break;
        default:
                console.log("Les données du photographes sont introuvables");
}

console.log(dataActualPhotographer);

//Afficher les données récupérées en HTML
function displayDataPhotographerInfos(photographers) {
        const photographersSection = document.querySelector(".photograph-header");

        const photographerModel = new Photographer(photographers);
        const userCardDOM = photographerModel.HTMLForActualPhotographer();
        photographersSection.appendChild(userCardDOM);
};

displayDataPhotographerInfos(dataActualPhotographer);

//Afficher les oeuvres de l'artiste
//Récupération de toutes les données dans un tableau
let allDataMediaPhtgs = dataPhts.media;

//Récupère seulement les images et vidéos du photographe de la page
const selectMediaActualPhotographer = (id) =>{
        allDataMediaPhtgs = allDataMediaPhtgs.filter(allDataMediaPhtgs => allDataMediaPhtgs.photographerId === id);
}
IdPhotograph = parseInt(IdPhotograph);  //selectMediaActualPhotographer() prend une valeur numérique, et pas une chaine
selectMediaActualPhotographer(IdPhotograph);

//Tri des medias en 2 tableau de 2 types : IMAGE et VIDEO
let dataImages = allDataMediaPhtgs;
let dataVideos = allDataMediaPhtgs;

//Récupère seulement les images du photographe de la page
const selectMediaActualPhotographerImage = () =>{
        dataImages = dataImages.filter(dataImages => dataImages.image);
}

//Récupère seulement les vidéos du photographe de la page
const selectMediaActualPhotographerVideo = () =>{
        dataVideos = dataVideos.filter(dataVideos => dataVideos.video);
}

console.log(allDataMediaPhtgs);

selectMediaActualPhotographerImage();
console.log(dataImages);

selectMediaActualPhotographerVideo();
console.log(dataVideos);

/*Afficher les données récupérées en HTML (mise en place arbre HTML des medias + ajout des titres)
La variable i permet de fournir le numéro du média au fur et a mesure pour la construction HTML*/
function displayDataPhotographerMedia(DataMediaPhotographers) {
        const photographersSection = document.querySelector(".media-container");
        let i = 0;
        
        DataMediaPhotographers.forEach((MediaPhotographer) => {
                i++;
                const photographerModel = new Media(MediaPhotographer);
                const userCardDOM = photographerModel.HTMLForAllMedia(i);
                photographersSection.appendChild(userCardDOM);
            });
        };

displayDataPhotographerMedia(allDataMediaPhtgs);

/*Afficher les images du photographe
La variable i place les éléments au bon endroit dans l'HTML*/
function displayDataPhotographerMediaImages(DataMediaImagesPhotographers) {
        let photographersSection = document.querySelector("#media");
        let i = 0;
        let j = 0;

        DataMediaImagesPhotographers.forEach((MediaImagesPhotographer) => {
                i++;
                const photographerModel = new Image(MediaImagesPhotographer);
                const userCardDOM = photographerModel.HTMLForImages(dataActualPhotographer.name, j);
                j++;
                photographersSection = document.querySelector(`#media_${i}`);

                photographersSection.appendChild(userCardDOM);
            });
        return i;
        };

const positionMedia = displayDataPhotographerMediaImages(dataImages);
console.log(positionMedia);
/*Afficher les vidéos du photographe
La variable i place les éléments au bon endroit dans l'HTML*/


function displayDataPhotographerMediaVideos(DataMediaVideosPhotographers) {
        let photographersSection = document.querySelector("#media");
        let i = positionMedia;
        let j = positionMedia;

        DataMediaVideosPhotographers.forEach((MediaVideosPhotographer) => {
                i++;
                const photographerModel = new Video(MediaVideosPhotographer);
                const userCardDOM = photographerModel.HTMLForVideos(dataActualPhotographer.name, j);
                photographersSection = document.querySelector(`#media_${i}`);

                photographersSection.appendChild(userCardDOM);
            });
        };

displayDataPhotographerMediaVideos(dataVideos);

//Évènement sur le menu de tri pour voir quand tel élément est sélectionné
const selectedMenu = document.getElementById("menu");

selectedMenu.addEventListener("change", (e) =>{
        const selectedMenuValue = selectedMenu.value;
        console.log(selectedMenuValue);
});

//Récupération des likes des différents médias du photographe actuel
//Images
console.log(dataImages[1].likes);

//Calculer l'ensemble des likes des photographes
//Retourne le nombre total de likes
function totalNumberOfLikes(data){
        const lengthData = data.length;
        let arrayOfLikes = [length];
        let result = 0;

        //Rangement de tous les likes dans un tableau
        for(let i = 0; i < lengthData; i++){
                arrayOfLikes[i] = parseInt(data[i].likes);
        }
        
        //Calcul de tous les likes
        for(let j = 0; j < arrayOfLikes.length; j++){
                result = result + arrayOfLikes[j];
        }
        result = String(result);
        return result;
}
/*
let objMedia = new Media(allDataMediaPhtgs);
let nbrLikes = totalNumberOfLikes(allDataMediaPhtgs);
objMedia.HTMLForFixedContainer(nbrLikes, )*/


