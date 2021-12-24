export class Media{
    constructor(data){  //Les différents éléments du photographe vont etre créés
        this.data = data;
        this.id = data.id;
        this.photographerID = data.photographerID;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.tagline = data.tagline;
        this.like = data.like;
        this.date = data.date;
        this.price = data.price;
    }
    HTMLForAllMedia(numberMedia){
        const article = document.createElement("article");
        const divMedia = document.createElement("div");
        const divDescriptionMedia = document.createElement("div");
        const titleOfMedia = document.createElement("p");
        const iconeHeart = document.createElement("i");
        divDescriptionMedia.setAttribute("class", "description_media");
        divMedia.setAttribute("id", `media_${numberMedia}`);
        divMedia.setAttribute("class", "media");
        titleOfMedia.setAttribute("class", "title_media");
        article.appendChild(divMedia);
        article.appendChild(divDescriptionMedia);
        divDescriptionMedia.appendChild(titleOfMedia);
        divDescriptionMedia.appendChild(iconeHeart);
        return (article);
    }
}



export class Image extends Media{
    HTMLForImages(namePhotographer, numberMedia){
        const image = document.createElement("img");
        const titleOfMedia = document.querySelectorAll(".title_media");
        titleOfMedia[numberMedia].textContent = this.data.title;
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
        titleOfMedia[numberMedia].textContent = this.data.title;
        //video.setAttribute("alt", `${this.data.title}`);
        video.setAttribute("autoplay", "true");
        sourceVideo.setAttribute("type", "video/mp4");
        sourceVideo.setAttribute("src", `assets/photographers/medias/videos/${namePhotographer}/${this.data.video}`);
        video.appendChild(sourceVideo);
        return (video);
    }
    
}