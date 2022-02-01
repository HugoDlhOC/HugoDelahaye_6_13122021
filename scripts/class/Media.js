export class Media {
  constructor(data) {
    //Les différents éléments du photographe vont etre créés
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
  HTMLForAllMedia() {
    const article = document.createElement("article");
    const divMedia = document.createElement("div");
    const divDescriptionMedia = document.createElement("div");
    const titleOfMedia = document.createElement("p");
    const numberOfLikes = document.createElement("span");
    const iconeHeart = document.createElement("i");
    divDescriptionMedia.setAttribute("class", "description_media");
    divDescriptionMedia.setAttribute("id", this.data.title);
    iconeHeart.setAttribute("class", "fas fa-heart");
    iconeHeart.setAttribute("aria-label", "bouton coeur pour aimer le média");
    divMedia.setAttribute("id", "media");
    divMedia.setAttribute("class", "media");
    divMedia.appendChild(this.constructDOM()); // la methode constructDOM appelée sera celle de l'image ou de la vidéo, en fonction du type de l'instance courante
    titleOfMedia.setAttribute("class", "title_media");
    titleOfMedia.setAttribute("aria-label", "le titre du média");
    numberOfLikes.setAttribute("class", "number_of_likes");
    numberOfLikes.setAttribute("aria-label", "nombre de j'aime ");
    article.appendChild(divMedia);
    article.appendChild(divDescriptionMedia);
    divDescriptionMedia.appendChild(titleOfMedia);
    titleOfMedia.innerHTML = this.data.title;
    divDescriptionMedia.appendChild(numberOfLikes);
    numberOfLikes.innerHTML = this.data.likes;
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
    numberTotalOfLikes.setAttribute(
      "aria-label",
      "le nombre total de j'aime du photographe est "
    );
    priceOfPhotographer.textContent = price + "€ /jour";
    priceOfPhotographer.setAttribute(
      "aria-label",
      "le prix du photographe journalier est de "
    );
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
    //Link media est une balise a qui aura en attribut href la source de notre media, utilisé pour la lightbox en javascript
    linkMedia.appendChild(image);
    linkMedia.setAttribute("class", "link_media");
    linkMedia.setAttribute(
      "href",
      `assets/photographers/medias/images/${this.data.photographerId}/${this.data.image}`
    );
    image.setAttribute(
      "src",
      `assets/photographers/medias/images/${this.data.photographerId}/${this.data.image}`
    );
    image.setAttribute("alt", "photo du photographe");
    image.setAttribute("id", this.data.id);
    image.setAttribute("class", "media_image");

    return linkMedia;
  }
}

export class Video extends Media {
  constructDOM() {
    const video = document.createElement("video");
    const linkMedia = document.createElement("a");
    video.setAttribute("id", this.data.id);
    video.setAttribute("controls", "controls");
    linkMedia.appendChild(video);
    linkMedia.setAttribute("class", "link_media");
    linkMedia.setAttribute(
      "href",
      `assets/photographers/medias/videos/${this.data.photographerId}/${this.data.video}`
    );
    video.setAttribute(
      "src",
      `assets/photographers/medias/videos/${this.data.photographerId}/${this.data.video}`
    );
    video.setAttribute("title", "vidéo du photographe");
    return linkMedia;
  }
}
