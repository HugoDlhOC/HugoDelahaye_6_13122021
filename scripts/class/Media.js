export class Media{
    constructor(data){  //Les différents éléments du photographe vont etre créés
        this.data = data;
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.tagline = data.tagline;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
    HTMLForAllMedia(){
        const article = document.createElement("article");
        const divMedia = document.createElement("div");
        //const linkMedia = document.createElement("a");
        const divDescriptionMedia = document.createElement("div");
        const titleOfMedia = document.createElement("p");
        const numberOfLikes = document.createElement("span");
        const iconeHeart = document.createElement("i");
        divDescriptionMedia.setAttribute("class", "description_media");
        iconeHeart.setAttribute("class", "fas fa-heart");
        divMedia.setAttribute("id", "media");
        divMedia.setAttribute("class", "media");
        divMedia.appendChild(this.constructDOM()) // la methode constructDOM appelée sera celle de l'image ou de la vidéo, en fonction du type de l'instance courante
        titleOfMedia.setAttribute("class", "title_media");
        numberOfLikes.setAttribute("class", "number_of_likes");
        article.appendChild(divMedia);
        article.appendChild(divDescriptionMedia);
        divDescriptionMedia.appendChild(titleOfMedia);
        titleOfMedia.innerHTML = this.data.title;
        divDescriptionMedia.appendChild(numberOfLikes);
        numberOfLikes.innerHTML = this.data.likes;
        divDescriptionMedia.appendChild(iconeHeart);
        return (article);
    }

    HTMLForFixedContainer(numberOfLikes, price){
        const containerPrixTotalLikes = document.createElement("div");
        const numberTotalOfLikes = document.createElement("span");
        const iconeHeart = document.createElement("i");
        const priceOfPhotographer = document.createElement("span");
        containerPrixTotalLikes.setAttribute("class", "container_prix_total_likes");
        iconeHeart.setAttribute("class", "fas fa-heart");
        numberTotalOfLikes.setAttribute("id", "total_likes_photographer");
        priceOfPhotographer.setAttribute("id", "price_photographer");
        numberTotalOfLikes.textContent = numberOfLikes;
        priceOfPhotographer.textContent = price + "€ /jour";  
        containerPrixTotalLikes.appendChild(numberTotalOfLikes);
        containerPrixTotalLikes.appendChild(iconeHeart);
        containerPrixTotalLikes.appendChild(priceOfPhotographer);
        return (containerPrixTotalLikes);
    }
}

export class Image extends Media{
    constructDOM(){
        const image = document.createElement("img");
        const linkMedia = document.createElement("a");
        //Link media est une balise a qui aura en attribut href la source de notre media, utilisé pour la lightbox en javascript
        linkMedia.appendChild(image);
        linkMedia.setAttribute("class", "link_media");
        linkMedia.setAttribute("href", `assets/photographers/medias/images/${this.data.photographerId}/${this.data.image}`);
        image.setAttribute("src", `assets/photographers/medias/images/${this.data.photographerId}/${this.data.image}`);
        image.setAttribute("alt", `${this.data.title}`);
        image.setAttribute("id", this.data.id);
        image.setAttribute("class", "media_image");
        
        return (linkMedia);
    }

}

export class Video extends Media{
    constructDOM(){
        const video = document.createElement("video");
        const linkMedia = document.createElement("a");
        const sourceVideo = document.createElement("source");
        video.setAttribute("autoplay", "true");
        video.setAttribute("id", this.data.id);
        video.setAttribute("controls", "controls");
        linkMedia.appendChild(video);
        linkMedia.setAttribute("class", "link_media");
        linkMedia.setAttribute("href", `assets/photographers/medias/images/${this.data.photographerId}/${this.data.video}`);
        sourceVideo.setAttribute("type", "video/mp4");
        sourceVideo.setAttribute("src", `assets/photographers/medias/videos/${this.data.photographerId}/${this.data.video}`);
        video.appendChild(sourceVideo);
        return (linkMedia);
    }
}