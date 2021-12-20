//FACTORY
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`; //Tete du photographe
    
    //AJOUT DES ÉLÉMENTS HTML
    function getUserCardDOM() {
        const a = document.createElement("a");
        const article = document.createElement("article");    //Créer une balise article
        const img = document.createElement("img");            //Créer une balise img
        const h2 = document.createElement("h2");              //Créer une balise H2
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        img.setAttribute("src", picture);                        //Ajout de l'attribut src avec la bonne source la photo (lien)
        img.setAttribute("alt", name);   
        h2.textContent = name;                                  //Ajout du nom du photographe
        h3.textContent = city + ", " + country;
        p1.textContent = tagline;  
        p1.setAttribute("class", "photographer_description");
        p2.textContent = price + "€/jour";          
        p2.setAttribute("class", "photographer_price");  
        a.setAttribute("href", "./photographer.html");    
        a.appendChild(article);                
        article.appendChild(img);                                           
        article.appendChild(h2);
        article.appendChild(h3);    
        article.appendChild(p1);        
        article.appendChild(p2);                       
        return (a);                                       //Retourne l'aricle créé                     
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}