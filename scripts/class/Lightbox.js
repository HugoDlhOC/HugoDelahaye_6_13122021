export class Lightbox{

    static init(linksMedias){
        const lightboxContainer = document.querySelector(".lightbox_container");
        const imageLightbox = document.querySelector(".container_media img");
        const videoLightbox = document.querySelector(".container_media video");
        const sourceVideoLightbox = document.querySelector(".container_media source");
        const titleMediaLightbox = document.querySelector(".title_media_lightbox");

        let codeHtml = null;
        linksMedias.forEach(media => {
            media.addEventListener("click", handleEvent);
            function handleEvent(e){
                e.preventDefault();
                console.log("click");
                lightboxContainer.style.display = "block";
                console.log(media.children[0].nodeName);
                console.log(media.children);
                console.log(media.children[0].alt);
                console.log(media.children[0].attributes[0].value);
                //console.log(media.children[0].children[0].attributes[1].value);
                console.log(codeHtml);
                console.log(linksMedias);
                //console.log(media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.attributes[0].value);
                //console.log(media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.attributes[1].value);
                //console.log(media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.firstChild.attributes[1].value);
                //Determiner si c'est une image ou vidéo
                if(media.children[0].nodeName === "IMG"){
                    console.log("oui");
                    imageLightbox.style.display = "block";
                    imageLightbox.setAttribute("src", media.children[0].attributes[0].value);
                    titleMediaLightbox.innerHTML = media.children[0].alt;
                }
                else if(media.children[0].nodeName === "VIDEO"){
                    videoLightbox.style.display = "block";
                    sourceVideoLightbox.setAttribute("src", media.children[0].children[0].attributes[1].value);
                }
                Lightbox.nextLightboxEvent(media);
            };
        });
        Lightbox.closeLightboxEvent();
    } 

    static closeLightboxEvent(){
        const lightboxContainer = document.querySelector(".lightbox_container");
        const closeLightbox = document.querySelector(".lightbox_close");
        const imageLightbox = document.querySelector(".container_media img");
        const videoLightbox = document.querySelector(".container_media video");
        console.log(closeLightbox);
        closeLightbox.addEventListener("click", e => {
            e.preventDefault();
            lightboxContainer.style.display = "none";
            imageLightbox.style.display = "none";
            videoLightbox.style.display = "none";
        });
    }

    static nextLightboxEvent(media){
        let i = 0;
        const closeLightbox = document.querySelector(".lightbox_next");
        const imageLightbox = document.querySelector(".container_media img");
        const videoLightbox = document.querySelector(".container_media video");
        const sourceVideoLightbox = document.querySelector(".container_media source");
        const titleMediaLightbox = document.querySelector(".title_media_lightbox");
        closeLightbox.addEventListener("click", handleEvent);

        function handleEvent(){
            alert("next");
            if(media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.nodeName === "IMG"){
                alert("C'est une image");
                imageLightbox.style.display = "block";
                imageLightbox.setAttribute("src", media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.attributes[0].value);
                titleMediaLightbox.innerHTML = media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.attributes[1].value;
            }
            else if(media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.nodeName === "VIDEO"){
                alert("C'est une video");
                sourceVideoLightbox.setAttribute("src", media.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.firstChild.attributes[1].value);
                videoLightbox.style.display = "block";
            }

            closeLightbox.removeEventListener("click", handleEvent);
        }
    }
}

