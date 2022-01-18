export class Lightbox{

    static openLightbox(){
        const lightbox = document.querySelector(".lightbox_container");
        lightbox.style.display="block";
    }

    static closeLightbox(){
        const lightbox = document.querySelector(".lightbox_container");
        const lightboxClose = document.querySelector(".lightbox_close");
        lightboxClose.addEventListener("click", handleFunction);
        function handleFunction(e){
            e.preventDefault();
            lightbox.style.display="none";
        }
    }

    static displayMediasLightbox(dataMedias, idCurrentMedia, idPhotographer){
        //le but de cette méthode est d'afficher les images/vidéos du photographe : toutes les données nécessaires sont dans dataMedias
        console.log(idCurrentMedia);
        console.log(dataMedias);
        console.log(dataMedias.length);
        let idMedias = [];
        dataMedias.forEach(idMedia => {
            idMedias.push(idMedia.id);
        });
        console.log(String(idMedias[0]));

        //rechercher l'index du média cliqué dans le tableau dataMedias grace a idCurrentMedia
        const conditionFindIndex = (element) => String(element) === idCurrentMedia;
        let indexOfCurrentMedia = idMedias.findIndex(conditionFindIndex);
        console.log(indexOfCurrentMedia);

        //afficher la bonne image/video et le bon titre grace a l'index (bien déterminer si c'est une video ou une image)
        const imageLightbox = document.querySelector(".container_media img");
        const videoLightbox = document.querySelector(".container_media video");
        const titleLightbox = document.querySelector(".title_media_lightbox");
        let typeOfMedia = undefined;
        displayVideoOrImage(indexOfCurrentMedia);
        function displayVideoOrImage(indexOfCurrentMedia){
            //console.log(dataMedias[indexOfCurrentMedia].data);

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

        function handleFunctionNext(){
            if(indexOfCurrentMedia === dataMedias.length - 1){
                indexOfCurrentMedia = 0;
                console.log(indexOfCurrentMedia);
                displayVideoOrImage(indexOfCurrentMedia);
            }
            else{
                indexOfCurrentMedia++;
                console.log(indexOfCurrentMedia);
                displayVideoOrImage(indexOfCurrentMedia);
            }
            
        }

        const beforeButtonLightbox = document.querySelector(".lightbox_before");

        beforeButtonLightbox.addEventListener("click", handleFunctionBefore);

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
    }
}        

