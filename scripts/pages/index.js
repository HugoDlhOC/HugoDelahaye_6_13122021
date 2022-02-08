import { Photographer } from "../class/Photographer.js";
import { MediaFactory } from "../factories/MediaFactory.js";

/**
 * Fonction va récupérer les données des photographes et retourner les données récupérées
 * @return { Promise }
 */
export async function getPhotographers() {
  const reponse = await fetch("./data/photographers.json");
  const data = await reponse.json();

  //Retourner un tableau d'instance de photographes en gardant seulement les medias du photographe courant
  return data.photographers.map((photographer) => {
    //On ne garde que les medias du photographe courant
    const medias = data.media.filter(
      (media) => media.photographerId === photographer.id
    );

    //On transforme les medias issus du fichier .json en instances de Media, grâce à notre factory (on aura soit une instance d'Image, soit une instance de Video)
    const mediasInstances = medias.map((media) =>
      MediaFactory.createMedia(media)
    );
    return new Photographer(photographer, mediasInstances);
  });
}

const photographersSection = document.querySelector(".photographer_section");

/**
 * Fonction qui affiche les données des différents photographes
 * @param { any } photographers
 */
function displayData(photographers) {
  photographers.forEach((photographer) => {
    const userCardDOM = photographer.HTMLForAllPhotographers();
    if (photographersSection !== null) {
      photographersSection.appendChild(userCardDOM);
    }
  });
}

/**
 * Fonction qui attend la promesse de getPhotographers(), affiche les données avec displayData(), et retourne les photographes
 * @return { any }
 */
async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers(); //AWAIT : attend la promesse de getPhotographers()
  displayData(photographers); //On affiche les données des photographes
  return photographers;
}

init(); //INITIALISATION
