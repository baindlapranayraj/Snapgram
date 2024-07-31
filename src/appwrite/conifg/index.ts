import { Account, Avatars, Client, Databases, Storage } from "appwrite";


export const AppwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    storageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    postCollectionID: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    userCollectionID: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    saveCollectionID: import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID,
  };

 export const client = new Client()
  .setEndpoint(AppwriteConfig.url)
  .setProject(AppwriteConfig.projectID)

export const account = new Account(client);
export const storage = new Storage(client)
export const database = new Databases(client)
export const avatars = new Avatars(client)

