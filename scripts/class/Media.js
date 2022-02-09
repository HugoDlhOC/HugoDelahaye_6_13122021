export class Media {
  constructor(data) {
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
  HTMLForAllMedia() {
    const article = document.createElement("article");
    const divMedia = document.createElement("div");
    const divDescriptionMedia = document.createElement("div");
    const titleOfMedia = document.createElement("p");
    const numberOfLikes = document.createElement("span");
    const iconeHeart = document.createElement("i");
    divDescriptionMedia.setAttribute("class", "description_media");
    divDescriptionMedia.setAttribute("id", this.title);
    iconeHeart.setAttribute("class", "fas fa-heart");
    iconeHeart.setAttribute("aria-label", "likes");
    divMedia.setAttribute("id", "media");
    divMedia.setAttribute("class", "media");
    divMedia.appendChild(this.constructDOM()); // la methode constructDOM appelée sera celle de l'image ou de la vidéo, en fonction du type de l'instance courante
    titleOfMedia.setAttribute("class", "title_media");
    titleOfMedia.setAttribute("aria-label", "titre du média");
    numberOfLikes.setAttribute("class", "number_of_likes");
    numberOfLikes.setAttribute("aria-label", "nombre de j'aime ");
    article.appendChild(divMedia);
    article.appendChild(divDescriptionMedia);
    divDescriptionMedia.appendChild(titleOfMedia);
    titleOfMedia.innerHTML = this.title;
    divDescriptionMedia.appendChild(numberOfLikes);
    numberOfLikes.innerHTML = this.likes;
    divDescriptionMedia.appendChild(iconeHeart);
    return article;
  }

  HTMLForFixedContainer(numberOfLikes, price) {
    const containerPrixTotalLikes = document.createElement("div");
    const numberTotalOfLikes = document.createElement("span");
    const iconeHeart = document.createElement("i");
    const priceOfPhotographer = document.createElement("span");
    containerPrixTotalLikes.setAttribute("class", "container_prix_total_likes");
    iconeHeart.setAttribute("class", "fas fa-heart");
    numberTotalOfLikes.setAttribute("id", "total_likes_photographer");
    priceOfPhotographer.setAttribute("id", "price_photographer");
    numberTotalOfLikes.textContent = numberOfLikes;
    numberTotalOfLikes.setAttribute("aria-label", "nombre total de likes ");
    priceOfPhotographer.textContent = price + "€ /jour";
    containerPrixTotalLikes.appendChild(numberTotalOfLikes);
    containerPrixTotalLikes.appendChild(iconeHeart);
    containerPrixTotalLikes.appendChild(priceOfPhotographer);
    return containerPrixTotalLikes;
  }
}

export class Image extends Media {
  constructDOM() {
    const image = document.createElement("img");
    const linkMedia = document.createElement("a");
    //Link media est une balise "a" qui aura en attribut href la source de notre media, utilisé pour la lightbox en javascript
    linkMedia.appendChild(image);
    linkMedia.setAttribute("class", "link_media");
    linkMedia.setAttribute(
      "href",
      `assets/photographers/medias/images/${this.photographerId}/${this.image}`
    );
    linkMedia.setAttribute("title", `${this.title}, vue gallerie`);
    image.setAttribute(
      "src",
      `assets/photographers/medias/images/${this.photographerId}/${this.image}`
    );
    image.setAttribute("alt", this.title);
    image.setAttribute("id", this.id);
    image.setAttribute("class", "media_image");

    return linkMedia;
  }
}

export class Video extends Media {
  constructDOM() {
    const video = document.createElement("video");
    const linkMedia = document.createElement("a");
    video.setAttribute("id", this.id);
    video.setAttribute("controls", "controls");
    linkMedia.appendChild(video);
    linkMedia.setAttribute("class", "link_media");
    linkMedia.setAttribute(
      "href",
      `assets/photographers/medias/videos/${this.photographerId}/${this.video}`
    );
    linkMedia.setAttribute("title", `${this.title}, vue gallerie`);
    video.setAttribute(
      "src",
      `assets/photographers/medias/videos/${this.photographerId}/${this.video}`
    );
    video.setAttribute("title", this.title);
    return linkMedia;
  }
}
