        import { Photographer } from "../class/Photographer.js";
        /*ASYNC : Une fonction asynchrone est une fonction qui s'exécute de façon asynchrone grâce à la boucle d'évènement en utilisant
        une promesse (Promise) comme valeur de retour.
        Cette fonction va récupérer les données des photographes et retourner les données récupérées*/
        export async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        /*fetch("./data/photographers.json").then(function(response){ //Promesse où il y a conversion en json
            return response.json();
        }).then(function(dataRecup){
            console.log(dataRecup); //On affiche les données converties
            console.log(dataRecup.photographers[0].name);
            alert(dataRecup.photographers[0].tagline);

        });*/

        const reponse = await fetch("./data/photographers.json");
        const data = await reponse.json();

        return data;   
        }

        export async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = new Photographer(photographer);
            const userCardDOM = photographerModel.HTMLForAllPhotographers();
            photographersSection.appendChild(userCardDOM);
        });
    };

        export async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers(); //AWAIT : attend la promesse de getPhotographers()
        displayData(photographers); //On affiche les données des photographes
        return photographers;
    };

    init(); //INITIALISATION