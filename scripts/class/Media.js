export class Media{
    constructor(data){  //Les différents éléments du photographe vont etre créés
        this.data = data;
        this.id = data.id;
        this.photographerID = data.photographerID;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.tagline = data.tagline;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
    HTMLForAllMedia(numberMedia){
        const article = document.createElement("article");
        const divMedia = document.createElement("div");
        const divDescriptionMedia = document.createElement("div");
        const titleOfMedia = document.createElement("p");
        const numberOfLikes = document.createElement("span");
        const iconeHeart = document.createElement("i");
        divDescriptionMedia.setAttribute("class", "description_media");
        iconeHeart.setAttribute("class", "fas fa-heart");
        divMedia.setAttribute("id", `media_${numberMedia}`);
        divMedia.setAttribute("class", "media");
        titleOfMedia.setAttribute("class", "title_media");
        numberOfLikes.setAttribute("class", "number_of_likes");
        article.appendChild(divMedia);
        article.appendChild(divDescriptionMedia);
        divDescriptionMedia.appendChild(titleOfMedia);
        divDescriptionMedia.appendChild(numberOfLikes);
        divDescriptionMedia.appendChild(iconeHeart);
        return (article);
    }

    HTMLForFixedContainer(numberOfLikes, price){
        const containerPrixTotalLikes = document.createElement("div");
        const numberTotalOfLikes = document.createElement("span");
        const iconeHeart = document.createElement("i");
        const priceOfPhotographer = document.createAttribute("span");
        containerPrixTotalLikes.setAttribute("class", "container_prix_total_likes");
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
    HTMLForImages(namePhotographer, numberMedia){
        const image = document.createElement("img");
        const titleOfMedia = document.querySelectorAll(".title_media");
        const numberOfLikes = document.querySelectorAll(".number_of_likes");
        titleOfMedia[numberMedia].textContent = this.data.title;
        numberOfLikes[numberMedia].textContent = this.data.likes;
        image.setAttribute("src", `assets/photographers/medias/images/${namePhotographer}/${this.data.image}`);
        image.setAttribute("alt", `${this.data.title}`);
        return (image);
    }

}

export class Video extends Media{
    HTMLForVideos(namePhotographer, numberMedia){
        const video = document.createElement("video");
        const sourceVideo = document.createElement("source");
        const titleOfMedia = document.querySelectorAll(".title_media");
        const numberOfLikes = document.querySelectorAll(".number_of_likes");
        titleOfMedia[numberMedia].textContent = this.data.title;
        numberOfLikes[numberMedia].textContent = this.data.likes;
        video.setAttribute("autoplay", "true");
        sourceVideo.setAttribute("type", "video/mp4");
        sourceVideo.setAttribute("src", `assets/photographers/medias/videos/${namePhotographer}/${this.data.video}`);
        video.appendChild(sourceVideo);
        return (video);
    }
    
}