const lightbox = document.querySelector(".lightbox_container_hide");
const main = document.querySelector("main");
const header = document.querySelector("header");
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
  openLightbox() {
    lightbox.classList.replace(
      "lightbox_container_hide",
      "lightbox_container_display"
    );
    lightbox.setAttribute("aria-hidden", "false");
    main.removeAttribute("class", "display_block");
    header.removeAttribute("class", "display_block");
    main.setAttribute("aria-hidden", "true");
    main.classList.add("no_display");
    header.classList.add("no_display");
  }

  /**
   * Ajoute un évènement click sur le bouton de fermeture pour ne plus afficher la lightbox
   */
  closeLightbox() {
    lightboxCloseBtn.addEventListener("click", eventFctHideLightbox);

    function eventFctHideLightbox(e) {
      e.preventDefault();
      lightbox.classList.replace(
        "lightbox_container_display",
        "lightbox_container_hide"
      );
      main.setAttribute("aria-hidden", "false");
      main.removeAttribute("class", "no_display");
      header.removeAttribute("class", "no_display");
      lightbox.setAttribute("aria-hidden", "true");
      videoLightbox.setAttribute("title", "#");
      videoLightbox.setAttribute("src", "#");
      imageLightbox.setAttribute("alt", "#");
      imageLightbox.setAttribute("src", "#");

      document.removeEventListener("keydown", eventFctEscapeKey);
    }

    document.addEventListener("keydown", eventFctEscapeKey);

    function eventFctEscapeKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        lightbox.classList.replace(
          "lightbox_container_display",
          "lightbox_container_hide"
        );
        main.setAttribute("aria-hidden", "false");
        main.removeAttribute("class", "no_display");
        header.removeAttribute("class", "no_display");
        lightbox.setAttribute("aria-hidden", "true");
        videoLightbox.setAttribute("title", "#");
        videoLightbox.setAttribute("src", "#");
        imageLightbox.setAttribute("alt", "#");
        imageLightbox.setAttribute("src", "#");

        document.removeEventListener("keydown", eventFctEscapeKey);
      }
    }
  }

  /**
   * Affiche les photos/vidéos des photographes, met en place la navigation de la lightbox
   * @param { ArrayConstructor } dataMedias
   * @param { Element } idCurrentMedia
   * @param { string } idPhotographer
   */
  displayMediasLightbox(dataMedias, idCurrentMedia, idPhotographer) {
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
      titleMediaLightbox.innerHTML = dataMedias[indexOfCurrentMedia].title;

      if (dataMedias[indexOfCurrentMedia].image === undefined) {
        typeOfMedia = "video";
      } else if (dataMedias[indexOfCurrentMedia].video === undefined) {
        typeOfMedia = "image";
      } else {
        console.log("this is not photo or video");
      }

      if (typeOfMedia === "image") {
        imageLightbox.classList.replace(
          "img_lightbox_hide",
          "img_lightbox_display"
        );
        videoLightbox.setAttribute("title", "#");
        videoLightbox.classList.replace(
          "video_lightbox_display",
          "video_lightbox_hide"
        );
        imageLightbox.setAttribute(
          "src",
          `assets/photographers/medias/images/${idPhotographer}/${dataMedias[indexOfCurrentMedia].image}`
        );
        imageLightbox.setAttribute(
          "alt",
          `${dataMedias[indexOfCurrentMedia].title}, vue rapprochée`
        );
      } else if (typeOfMedia === "video") {
        videoLightbox.classList.replace(
          "video_lightbox_hide",
          "video_lightbox_display"
        );
        imageLightbox.setAttribute("alt", "#");
        imageLightbox.removeAttribute("class", "img_lightbox_display");
        imageLightbox.classList.add("img_lightbox_hide");
        videoLightbox.setAttribute(
          "src",
          `assets/photographers/medias/videos/${idPhotographer}/${dataMedias[indexOfCurrentMedia].video}`
        );
        videoLightbox.setAttribute(
          "title",
          `${dataMedias[indexOfCurrentMedia].title}, vue rapprochée`
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
        displayVideoOrImage(indexOfCurrentMedia);
      } else {
        indexOfCurrentMedia--;
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
