import { Image, Video } from "../class/Media.js";

export class MediaFactory {
  /*FCT Static --> Les méthodes statiques sont utilisées lorsque la méthode ne s'applique qu'à la classe elle-même et pas à ses instances.
  Les méthodes statiques sont généralement utilisées pour créer des fonctions utilitaires.*/
  static createMedia(media) {
    let newMedia;
    if (media.hasOwnProperty('image')) {
      newMedia = new Image(media);
    } else if (media.hasOwnProperty('video')) {
      newMedia = new Video(media);
    }
    return newMedia;
  }
}
