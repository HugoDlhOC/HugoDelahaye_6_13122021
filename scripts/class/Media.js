class Media{
    constructor(data){  //Les différents éléments du photographe vont etre créés
        this.id = data.id;
        this.photographerID = data.photographerID;
        this.title = data.title;
        this.image = data.image;
        this.tagline = data.tagline;
        this.like = data.like;
        this.date = data.date;
        this.price = data.price;
    }
}

class Image extends Media{

}

class Video extends Media{
    
}