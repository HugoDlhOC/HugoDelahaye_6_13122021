export class Lightbox{
    static init(linksMedias){
        const gallery = linksMedias.map(link => link.getAttribute("href")); //Gallery comporte tous les chemins des images/vidéos
        linksMedias.forEach(linkMedia => {
            linkMedia.addEventListener("click", e => {
                e.preventDefault(); /*Empeche le comportement par defaut*/
                debugger
                new Lightbox(e.currentTarget.getAttribute("href"), e.path[0].alt, gallery);
            }
        )})
    }

    constructor(url, alt, gallery){
        this.element = this.constructHTML();
        this.gallery = gallery;
        this.loadMedia(url, alt);
        document.body.appendChild(this.element); //On affecte notre HTML de la lightbox au body du HTML
    }

    loadMedia(url, alt){
        this.url = null;    //Pas de media au départ
        this.alt = null;
        const image = new Image();
        const container = this.element.querySelector(".container_image");
        const titleMedia = document.createElement("p");
        titleMedia.setAttribute("class", "title_media_lightbox");
        const loader = document.createElement("div");
        loader.classList.add("loader_lightbox");
        container.innerHTML = "";   //On vide
        container.appendChild(loader);
        image.onload = () => {
            container.removeChild(loader);
            container.appendChild(image);
            container.appendChild(titleMedia);
            this.url = url;
        }
        
        titleMedia.innerHTML = alt;
        image.src=url;
        image.alt=alt;
    }
    constructHTML(){
        const DOMLightbox = document.createElement("sort_menu_close");
        DOMLightbox.setAttribute("class", "lightbox");
        DOMLightbox.innerHTML = `<button class="lightbox_close"></button>
        <button class="lightbox_next"></button>
        <button class="lightbox_before"></button>
        <div class="container_image"></div>`

        //Permettre la fermeture de la lightbox
        DOMLightbox.querySelector(".lightbox_close").addEventListener("click", (e) =>{
            e.preventDefault();
            DOMLightbox.style.display = "none";
        });

        DOMLightbox.querySelector(".lightbox_next").addEventListener("click", (e) =>{
            e.preventDefault();
            let position = this.gallery.findIndex(i => i === this.url);

            //Attention, si on arrive à la dernière image, ceci doit être géré
            if(position === this.gallery.length -1){    //Si on arrive au bout
                position = -1;  //On revient a la valeur 0
            }

            this.loadMedia(this.gallery[position+1]);
        });

        DOMLightbox.querySelector(".lightbox_before").addEventListener("click", (e) =>{
            e.preventDefault();
            let position = this.gallery.findIndex(i => i === this.url);

            //Attention, si on arrive à la dernière image, ceci doit être géré
            if(position === 0){    
                position = this.gallery.length -1;  //Revient a la valeur de la dernière image
            }

            this.loadMedia(this.gallery[position-1]);   //Décrémentation
            
        });

        return DOMLightbox;
    }

}
