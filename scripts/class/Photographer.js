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
        img.setAttribute("src", `assets/photographers/portraits/${this.data.portrait}`);                        //Ajout de l'attribut src avec la bonne source la photo (lien)
        img.setAttribute("alt", this.data.name);   
        h2.textContent = this.data.name;                                  //Ajout du nom du photographe
        h3.textContent = this.data.city + ", " + this.data.country;
        p1.textContent = this.data.tagline;  
        p1.setAttribute("class", "photographer_description");
        p2.textContent = this.data.price + "€/jour";          
        p2.setAttribute("class", "photographer_price");  
        a.setAttribute("href", `./photographer.html?id=${this.data.id}`);      
        a.appendChild(article);  
        article.appendChild(img);                                           
        article.appendChild(h2);
        article.appendChild(h3);    
        article.appendChild(p1);        
        article.appendChild(p2);                       
        return (a);                                  
    }

    HTMLForActualPhotographer(){
        const article = document.createElement("article");    //Créer une balise article
        const h2 = document.createElement("h2");              //Créer une balise H2
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        //const p2 = document.createElement("p");
        const img = document.createElement("img");            //Créer une balise img
        const button = document.getElementById("contact_me");
        img.setAttribute("src", `assets/photographers/portraits/${this.data.portrait}`);                        //Ajout de l'attribut src avec la bonne source la photo (lien)
        img.setAttribute("alt", this.data.name);   
        h2.textContent = this.data.name;                                  //Ajout du nom du photographe
        h3.textContent = this.data.city + ", " + this.data.country;
        p1.textContent = this.data.tagline;  
        p1.setAttribute("class", "photographer_description");
        //p2.textContent = this.data.price + "€/jour";          
        //p2.setAttribute("class", "photographer_price");                                            
        article.appendChild(h2);
        article.appendChild(h3);    
        article.appendChild(p1);        
        //article.appendChild(p2);
        article.appendChild(button); 
        article.appendChild(img);                          
        return (article);                                  
    }
}