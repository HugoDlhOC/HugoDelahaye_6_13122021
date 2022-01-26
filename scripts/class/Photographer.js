export class Photographer{
    constructor(data, medias){
        this.data = data;
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
        this.picture = `assets/photographers/portraits/${data.portrait}`; //Tete du photographe
        this.medias = medias;
    }

    HTMLForAllPhotographers(){
        const a = document.createElement("a");
        const article = document.createElement("article");    //Créer une balise article
        const img = document.createElement("img");            //Créer une balise img
        const h2 = document.createElement("h2");              //Créer une balise H2
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        div1.setAttribute("class", "link_photograph");
        div1.setAttribute("aria-label", this.data.name);
        div2.setAttribute("class", "description_photograph");
        img.setAttribute("src", `assets/photographers/portraits/${this.data.portrait}`);                        //Ajout de l'attribut src avec la bonne source la photo (lien)
        img.setAttribute("alt", this.data.name); 
        img.setAttribute("aria-label", "portrait du photographe");  

        h2.textContent = this.data.name;                                  //Ajout du nom du photographe
        h3.textContent = this.data.city + ", " + this.data.country;
        h3.setAttribute("aria-label", "ville du photographe");
        p1.textContent = this.data.tagline;  
        p1.setAttribute("class", "photographer_description");
        p1.setAttribute("aria-label", "description du photographe");
        p2.textContent = this.data.price + "€/jour";          
        p2.setAttribute("class", "photographer_price");
        p2.setAttribute("aria-label", "prix du photographe par jour");  
        a.setAttribute("href", `./photographer.html?id=${this.data.id}`);    
        
        article.appendChild(div1);
        article.appendChild(div2);
        div1.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        div2.appendChild(h3);
        div2.appendChild(p1);
        div2.appendChild(p2);
        
        return (article);
        
    }

    HTMLForActualPhotographer(){
        const article = document.createElement("article");    //Créer une balise article
        const h2 = document.createElement("h2");              //Créer une balise H2
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const img = document.createElement("img");            //Créer une balise img
        const button = document.getElementById("contact_me");
        img.setAttribute("src", `assets/photographers/portraits/${this.data.portrait}`);                        //Ajout de l'attribut src avec la bonne source la photo (lien)
        img.setAttribute("alt", this.data.name);   
        img.setAttribute("aria-label", "portrait du photographe");
        h2.textContent = this.data.name;                                  //Ajout du nom du photographe
        h2.setAttribute("aria-label", "nom du photographe");
        h3.textContent = this.data.city + ", " + this.data.country;
        h3.setAttribute("aria-label", "ville du photographe");
        p1.textContent = this.data.tagline;  
        p1.setAttribute("class", "photographer_description");                                         
        article.appendChild(div);
        div.setAttribute("aria-label", "informations du photographe");
        div.appendChild(h2);
        div.appendChild(p1);
        article.appendChild(h3);           
        article.appendChild(button); 
        article.appendChild(img);                          
        return (article);                                  
    }
}