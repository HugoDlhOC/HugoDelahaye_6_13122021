//Mettre le code JavaScript lié à la page photographer.html
//init();
//Récupération de l'id du photographe transmis dans l'url
const queryStringUrlId = window.location.search;
alert(queryStringUrlId);
//Il faut maintenant supprimer le ?
const IdPhotograph = queryStringUrlId.slice(4);
alert(IdPhotograph);

const donnees = await getPhotographers();
console.log(donnees);