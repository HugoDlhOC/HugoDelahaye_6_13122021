const lightbox = document.querySelector(".lightbox_container");
const main = document.querySelector("#main");
const lightboxCloseBtn = document.querySelector(".lightbox_close");
const imageLightbox = document.querySelector(".container_media img");
const videoLightbox = document.querySelector(".container_media video");
const titleMediaLightbox = document.querySelector(".title_media_lightbox");
const nextButtonLightbox = document.querySelector(".lightbox_next");
const beforeButtonLightbox = document.querySelector(".lightbox_before");

export class Lightbox {
  /**
   * Permet d'afficher la lightbox
   */
  static openLightbox() {
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    main.style.display = "none";
  }

  /**
   * Ajoute un évènement click sur le bouton de fermeture pour ne plus afficher la lightbox
   */
  static closeLightbox() {
    lightboxCloseBtn.addEventListener("click", eventFctHideLightbox);

    function eventFctHideLightbox(e) {
      e.preventDefault();
      lightbox.style.display = "none";
      main.setAttribute("aria-hidden", "false");
      main.style.display = "block";
      lightbox.setAttribute("aria-hidden", "true");
      videoLightbox.setAttribute("title", "#");
      videoLightbox.setAttribute("src", "#");
      imageLightbox.setAttribute("alt", "#");
      imageLightbox.setAttribute("src", "#");
    }

    document.addEventListener("keydown", eventFctEscapeKey);

    function eventFctEscapeKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        lightbox.style.display = "none";
        main.setAttribute("aria-hidden", "false");
        main.style.display = "block";
        lightbox.setAttribute("aria-hidden", "true");
        videoLightbox.setAttribute("title", "#");
        videoLightbox.setAttribute("src", "#");
        imageLightbox.setAttribute("alt", "#");
        imageLightbox.setAttribute("src", "#");
      }
    }
  }

  /**
   * Affiche les photos/vidéos des photographes, met en place la navigation de la lightbox
   * @param { ArrayConstructor } dataMedias
   * @param { Element } idCurrentMedia
   * @param { string } idPhotographer
   */
  static displayMediasLightbox(dataMedias, idCurrentMedia, idPhotographer) {
    //le but de cette méthode est d'afficher les images/vidéos du photographe : toutes les données nécessaires sont dans dataMedias
    let idMedias = [];
    dataMedias.forEach((idMedia) => {
      idMedias.push(idMedia.id);
    });

    //rechercher l'index du média cliqué dans le tableau dataMedias grace a idCurrentMedia
    const conditionFindIndex = (element) => String(element) === idCurrentMedia;
    let indexOfCurrentMedia = idMedias.findIndex(conditionFindIndex);

    //afficher la bonne image/video et le bon titre grace a l'index (bien déterminer si c'est une video ou une image)
    let typeOfMedia = undefined;
    displayVideoOrImage(indexOfCurrentMedia);

    /**
     * Détermine si c'est une vidéo ou une image, et affiche le bon média
     * @param { number } indexOfCurrentMedia
     */
    function displayVideoOrImage(indexOfCurrentMedia) {
      titleMediaLightbox.innerHTML = dataMedias[indexOfCurrentMedia].data.title;

      if (dataMedias[indexOfCurrentMedia].image === undefined) {
        console.log("c'est une vidéo");
        typeOfMedia = "video";
      } else if (dataMedias[indexOfCurrentMedia].video === undefined) {
        console.log("c'est une image");
        typeOfMedia = "image";
      } else {
        console.log("aucun fichier trouvé");
      }

      if (typeOfMedia === "image") {
        imageLightbox.style.display = "block";
        videoLightbox.setAttribute("title", "#");
        videoLightbox.style.display = "none";
        imageLightbox.setAttribute(
          "src",
          `assets/photographers/medias/images/${idPhotographer}/${dataMedias[indexOfCurrentMedia].data.image}`
        );
        imageLightbox.setAttribute(
          "alt",
          `${dataMedias[indexOfCurrentMedia].data.title}, vue rapprochée`
        );
      } else if (typeOfMedia === "video") {
        videoLightbox.style.display = "block";
        imageLightbox.setAttribute("alt", "#");
        imageLightbox.style.display = "none";
        videoLightbox.setAttribute(
          "src",
          `assets/photographers/medias/videos/${idPhotographer}/${dataMedias[indexOfCurrentMedia].data.video}`
        );
        videoLightbox.setAttribute(
          "title",
          `${dataMedias[indexOfCurrentMedia].data.title}, vue rapprochée`
        );
      }
    }

    nextButtonLightbox.addEventListener("click", eventFctNextMedia);

    /**
     * Fonction pour l'évènement click sur le bouton next en prenant en compte si on arrive au dernier ou au premier média
     */
    function eventFctNextMedia() {
      if (indexOfCurrentMedia === dataMedias.length - 1) {
        indexOfCurrentMedia = 0;
        displayVideoOrImage(indexOfCurrentMedia);
      } else {
        indexOfCurrentMedia++;
        displayVideoOrImage(indexOfCurrentMedia);
      }
    }

    document.addEventListener("keydown", eventFctNextMediaKey);

    /**
     * Fonction pour l'évènement keydown qui fait en sorte que si la touche flèche droite est utilisée, la méthode handleFunctionNext est appelée
     * @param { any } e
     */
    function eventFctNextMediaKey(e) {
      if (e.keyCode === 39) {
        eventFctNextMedia();
      }
    }

    beforeButtonLightbox.addEventListener("click", eventFctPreviousMedia);

    /**
     * Fonction pour l'évènement click sur le bouton before en prenant en compte si on arrive au dernier ou au premier média
     */
    function eventFctPreviousMedia() {
      if (indexOfCurrentMedia === 0) {
        indexOfCurrentMedia = dataMedias.length - 1;
        console.log(indexOfCurrentMedia);
        displayVideoOrImage(indexOfCurrentMedia);
      } else {
        indexOfCurrentMedia--;
        console.log(indexOfCurrentMedia);
        displayVideoOrImage(indexOfCurrentMedia);
      }
    }

    document.addEventListener("keydown", eventFctPreviousMediaKey);

    /**
     * Fonction pour l'évènement keydown qui fait en sorte que si la touche flèche gauche est utilisée, la méthode handleFunctionBefore est appelée
     * @param { any } e
     */
    function eventFctPreviousMediaKey(e) {
      if (e.keyCode === 37) {
        eventFctPreviousMedia();
      }
    }
  }
}
