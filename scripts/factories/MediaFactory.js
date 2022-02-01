import { Image, Video } from "../class/Media.js";

export class MediaFactory {
  static createMedia(media) {
    let newMedia;
    if (Object.prototype.hasOwnProperty.call(media, "image")) {
      newMedia = new Image(media);
    } else if (Object.prototype.hasOwnProperty.call(media, "video")) {
      newMedia = new Video(media);
    }
    return newMedia;
  }
}
