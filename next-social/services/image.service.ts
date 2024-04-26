import { storage } from "../firebase-config"
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"; // so that we can generate a unique name for each image

export const uploadImage = async (image: File) => {
  try {
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      return url;
  } catch (error) {
      console.log("Cannot upload image at this time");
  }
}