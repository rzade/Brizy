import Config from "visual/global/Config";
import { downloadImageFromCloud } from "visual/utils/api/editor";
import { objectToQueryString } from "visual/utils/url";
import cloudImageUrl, { getFilter } from "./imageUrl.js";
import { imageAttachments } from "./imageAttachments";

const siteUrl = Config.get("urls").site;
const imageUrlPrefix = siteUrl.includes("?") ? `${siteUrl}&` : `${siteUrl}/?`;
const pendingRequests = {};

export default function imageUrl(
  imageSrc,
  options = {
    iW: 5000,
    iH: "any"
  }
) {
  if (!imageSrc) {
    return null;
  }

  if (IS_EDITOR) {
    const filter = getFilter(options);
    const imageDownloaded =
      imageAttachments.has(imageSrc) || imageSrc.indexOf("wp-") === 0;

    if (imageDownloaded) {
      const queryString = objectToQueryString({
        brizy_media: imageSrc,
        brizy_crop: filter,
        brizy_post: Config.get("wp").page
      });

      return imageUrlPrefix + queryString;
    } else {
      if (!pendingRequests[imageSrc]) {
        pendingRequests[imageSrc] = true;

        downloadImageFromCloud(imageSrc).then(() => {
          pendingRequests[imageSrc] = false;
          imageAttachments.add(imageSrc);
        });
      }

      return cloudImageUrl(imageSrc, options);
    }
  } else {
    const filter = getFilter(options);
    const queryString = objectToQueryString({
      brizy_media: imageSrc,
      brizy_crop: filter,
      brizy_post: Config.get("wp").page
    });

    return imageUrlPrefix + queryString;
  }
}

export function svgUrl(src) {
  if (src) {
    const { customFile } = Config.get("urls");

    return `${customFile}${src}`;
  }

  return null;
}
