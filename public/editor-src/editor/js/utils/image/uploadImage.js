import _ from "underscore";
import { uploadImage as apiUploadImage } from "visual/utils/api/editor";

const defaultOptions = {
  acceptedExtensions: ["jpeg", "jpg", "png", "gif"],
  onBase64: base64 => {},
  onUpload: uploadData => {},
  onError: e => console.log("uploadImage default onError", e)
};

export default function uploadImage(imageFile, options) {
  const { acceptedExtensions, onBase64, onUpload, onError } = _.extend(
    {},
    defaultOptions,
    options
  );

  Promise.resolve(imageFile)
    .then(file => {
      const extension = file.name.split(".").pop();
      const isAcceptedExtension =
        extension &&
        _.some(
          acceptedExtensions,
          accepted => accepted === extension.toLowerCase()
        );

      if (!isAcceptedExtension) {
        throw "EXTENSION_NOT_ACCEPTED";
      }

      return file;
    })
    .then(getBase64)
    .then(base64 => {
      onBase64(base64);

      const strippedBase64 = base64.replace(/data:image\/.+;base64,/, "");
      return apiUploadImage({
        base64: strippedBase64
      });
    })
    .then(onUpload)
    .catch(onError);
}

function getBase64(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();

    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.onerror = function() {
      reject("Error read file.");
    };
    reader.onabort = function() {
      reject("Abort read file.");
    };
    reader.readAsDataURL(file);
  });
}
