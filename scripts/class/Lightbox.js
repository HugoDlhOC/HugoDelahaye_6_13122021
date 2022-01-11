export class Lightbox{
    static init(linksMedias){
        linksMedias.forEach(linkMedia => {
            linkMedia.addEventListener("click", e => {
                e.preventDefault(); /*Empeche le comportement par defaut*/
                new Lightbox(e.currentTarget.getAttribute("href"), e.path[0].alt);
            }
        )})
    }

    constructor(url, alt){
        const element = this.constructHTML(url, alt);
        document.body.appendChild(element); //On affecte notre HTML de la lightbox au body du HTML
    }

    constructHTML(url, alt){
        const DOMLightbox = document.createElement("sort_menu_close");
        DOMLightbox.setAttribute("class", "lightbox");
        DOMLightbox.innerHTML = `<button class="lightbox_close"></button>
        <button class="lightbox_next"></button>
        <button class="lightbox_before"></button>
        <div class="container_image">
          <img src="${url}" alt="${alt}">
        </div>`
        //Permettre la fermeture de la lightbox
        DOMLightbox.querySelector(".lightbox_close").addEventListener("click", (e) =>{
            e.preventDefault();
            DOMLightbox.style.display = "none";
        });

        return DOMLightbox;
    }

    //Fonction pour fermer la lightbox avec un event Mouse
}
