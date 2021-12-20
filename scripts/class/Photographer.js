class Photographer{
    constructor(data){
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;

        return { _name, _picture, _city, _country, _tagline, _price, getUserCardDOM }
    }

    getUserCardDOM(){
        const a = document.createElement("a");
        const article = document.createElement("article");    //Créer une balise article
        const img = document.createElement("img");            //Créer une balise img
        const h2 = document.createElement("h2");              //Créer une balise H2
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        img.setAttribute("src", `assets/photographers/${_portrait}`);                        //Ajout de l'attribut src avec la bonne source la photo (lien)
        img.setAttribute("alt", _name);   
        h2.textContent = _name;                                  //Ajout du nom du photographe
        h3.textContent = _city + ", " + _country;
        p1.textContent = _tagline;  
        p1.setAttribute("class", "photographer_description");
        p2.textContent = _price + "€/jour";          
        p2.setAttribute("class", "photographer_price");  
        a.setAttribute("href", "./photographer.html");    
        a.appendChild(article);  
        article.appendChild(img);                                           
        article.appendChild(h2);
        article.appendChild(h3);    
        article.appendChild(p1);        
        article.appendChild(p2);                       
        return (a);                                  
    }
    
}