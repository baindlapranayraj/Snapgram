import { ID } from "appwrite";
import { AppwriteConfig, storage } from "./conifg"; // Fixed typo in "config"

// Uploading the file(Create)
export const uploadFile = async (file: File) => {
  console.log('Uploading file:', file);

  try {
    const fileRes = await storage.createFile(
      AppwriteConfig.storageID,
      ID.unique(),
      file
    );

    console.log('File uploaded:', fileRes);
    if (fileRes) {
      return fileRes;
    }
  } catch (error) {
    console.log(`Error uploading file: ${error}`);
  }
};

// Fetching file image preview(Read)
export const getFileImagePreview = async (fileId: string) => {
  try {
    const imgPrev = await storage.getFilePreview(
      AppwriteConfig.storageID,
      fileId,
      2000,
      2000
    );
    if (imgPrev) {
      return imgPrev;
    }
  } catch (error) {
    console.error(`Error fetching file image preview: ${error}`);
  }
};

//Updating the File Image Preview (Update)

// Deleting the file(Delete)
export const deleteFile = async (fileId: string) => {
  try {
    const fileRes = await storage.deleteFile(AppwriteConfig.storageID, fileId);
    if (fileRes) {
      return fileRes;
    }
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
};
