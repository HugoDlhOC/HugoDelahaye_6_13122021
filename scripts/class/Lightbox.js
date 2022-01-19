export class Lightbox{
    /**
    * Permet d'afficher la lightbox
    */
    static openLightbox(){
        const lightbox = document.querySelector(".lightbox_container");
        lightbox.style.display="block";
    }

    /**
    * Ajoute un évènement click sur le bouton de fermeture pour ne plus afficher la lightbox
    */
    static closeLightbox(){
        const lightbox = document.querySelector(".lightbox_container");
        const lightboxClose = document.querySelector(".lightbox_close");
        lightboxClose.addEventListener("click", handleFunction);
        function handleFunction(e){
            e.preventDefault();
            lightbox.style.display="none";
        }

        document.addEventListener("keydown", handleFunctionEscapeKey);
        function handleFunctionEscapeKey(e){
            if(e.key === "Escape"){
                e.preventDefault();
                lightbox.style.display="none";
            }
        }
    }

    /**
    * Affiche les photos/vidéos des photographes, met en place la navigation de la lightbox 
    * @param { ArrayConstructor } dataMedias
    * @param { Element } idCurrentMedia
    * @param { string } idPhotographer
    */
    static displayMediasLightbox(dataMedias, idCurrentMedia, idPhotographer){
        //le but de cette méthode est d'afficher les images/vidéos du photographe : toutes les données nécessaires sont dans dataMedias
        let idMedias = [];
        dataMedias.forEach(idMedia => {
            idMedias.push(idMedia.id);
        });

        //rechercher l'index du média cliqué dans le tableau dataMedias grace a idCurrentMedia
        const conditionFindIndex = (element) => String(element) === idCurrentMedia;
        let indexOfCurrentMedia = idMedias.findIndex(conditionFindIndex);

        //afficher la bonne image/video et le bon titre grace a l'index (bien déterminer si c'est une video ou une image)
        const imageLightbox = document.querySelector(".container_media img");
        const videoLightbox = document.querySelector(".container_media video");
        const titleLightbox = document.querySelector(".title_media_lightbox");
        let typeOfMedia = undefined;
        displayVideoOrImage(indexOfCurrentMedia);

        /**
        * Détermine si c'est une vidéo ou une image, et affiche le bon média
        * @param { number } indexOfCurrentMedia
        */
        function displayVideoOrImage(indexOfCurrentMedia){
            titleLightbox.innerHTML = dataMedias[indexOfCurrentMedia].data.title;

            if(dataMedias[indexOfCurrentMedia].image === undefined){
                console.log("c'est une vidéo");
                typeOfMedia = "video";
            }
            else if(dataMedias[indexOfCurrentMedia].video === undefined){
                console.log("c'est une image");
                typeOfMedia = "image";
            }
            else{
                console.log("aucun fichier trouvé");
            }

            if(typeOfMedia === "image"){
                imageLightbox.style.display = "block";
                videoLightbox.style.display = "none";
                imageLightbox.setAttribute("src", `assets/photographers/medias/images/${idPhotographer}/${dataMedias[indexOfCurrentMedia].data.image}`);
            }
            else if(typeOfMedia === "video"){
                videoLightbox.style.display = "block";
                imageLightbox.style.display = "none";
                videoLightbox.setAttribute("src", `assets/photographers/medias/videos/${idPhotographer}/${dataMedias[indexOfCurrentMedia].data.video}`);
            }
        }

        const nextButtonLightbox = document.querySelector(".lightbox_next");
        nextButtonLightbox.addEventListener("click", handleFunctionNext);

        /**
        * Fonction pour l'évènement click sur le bouton next en prenant en compte si on arrive au dernier ou au premier média
        */
        function handleFunctionNext(){
            if(indexOfCurrentMedia === dataMedias.length - 1){
                indexOfCurrentMedia = 0;
                displayVideoOrImage(indexOfCurrentMedia);
            }
            else{
                indexOfCurrentMedia++;
                displayVideoOrImage(indexOfCurrentMedia);
            }
        }

        document.addEventListener("keydown", handleFunctionNextKey);

        /**
        * Fonction pour l'évènement keydown qui fait en sorte que si la touche flèche droite est utilisée, la méthode handleFunctionNext est appelée
        * @param { any } e
        */
        function handleFunctionNextKey(e){
            if(e.keyCode === 39){
                handleFunctionNext();
            }
        }
    
        const beforeButtonLightbox = document.querySelector(".lightbox_before");
        beforeButtonLightbox.addEventListener("click", handleFunctionBefore);

        /**
        * Fonction pour l'évènement click sur le bouton before en prenant en compte si on arrive au dernier ou au premier média
        */
        function handleFunctionBefore(){
            if(indexOfCurrentMedia === 0){
                indexOfCurrentMedia = dataMedias.length - 1;
                console.log(indexOfCurrentMedia);
                displayVideoOrImage(indexOfCurrentMedia);
            }
            else{
                indexOfCurrentMedia--;
                console.log(indexOfCurrentMedia);
                displayVideoOrImage(indexOfCurrentMedia);
            }
        }

        document.addEventListener("keydown", handleFunctionBeforeKey);

        /**
        * Fonction pour l'évènement keydown qui fait en sorte que si la touche flèche gauche est utilisée, la méthode handleFunctionBefore est appelée
        * @param { any } e
        */
        function handleFunctionBeforeKey(e){
            if(e.keyCode === 37){
                handleFunctionBefore();
            }
        }
    }
}        

