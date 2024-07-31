import { ID, Permission, Query } from "appwrite";
import { AppwriteConfig, database } from "./conifg";
import { deleteFile, getFileImagePreview, uploadFile } from "./FileStorage";

type UserDatabaseType = {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL;
};

//================================================================
//********************** User Account Database **********************
//=================================================================

//Create Database for Users(Creating)
export const saveUserToDB = async (data: UserDatabaseType) => {
  try {
    const newUser = await database.createDocument(
      AppwriteConfig.databaseID,
      AppwriteConfig.userCollectionID,
      ID.unique(),
      data,
    );
    if (!newUser) throw new Error(`Error while storing user data in database`);

    return newUser;
  } catch (error) {
    console.error(
      `The given error occured while storing User Data in Database`,
    );
  }
};


//Query Users data from Databse based on the QueryId of accountId(Read)
export const queryDocument = async (queryId: string) => {
  try {
    const list = await database.listDocuments(
      AppwriteConfig.databaseID,
      AppwriteConfig.userCollectionID,
      [Query.equal("accountId", queryId)],
    );
    if (list) return list;
  } catch (error) {
    console.log(error);
  }
};


//================================================================
//********************** Post Database **********************
//=================================================================

export type CreatePostType = {
  accountId: string;
  caption: string;
  tags: string;
  location: string;
  file: File[];
};

//Creating the Post (Create)
export const PostCreateDB = async (data: CreatePostType) => {
  try {
    const NewTags = data.tags?.replace(/ /g, "").split(",") || [];

    //New File Data
    const FileData = await uploadFile(data.file[0]);

    if (!FileData) {
      throw Error();
    }
    console.log(`File Created`,FileData);
    // New File Url
    const fileImgUrl = await getFileImagePreview(FileData.$id);
    console.log(`The fileUrl ${fileImgUrl}`)
    if (!fileImgUrl) {
      await deleteFile(FileData.$id);
    }

    const postData = {
      
      creator: data.accountId,
      caption: data.caption,
      tags: NewTags,
      location: data.location,
      imageUrl: fileImgUrl,
      imageId: FileData.$id,
    };

    const PostRes = await database.createDocument(
      AppwriteConfig.databaseID,
      AppwriteConfig.postCollectionID,
      ID.unique(),
      postData,
    );
    if (!PostRes) {
        await deleteFile(FileData.$id)
        throw Error()
    };
    console.log("Post is created",PostRes)
    return PostRes;
  } catch (error) {
    deleteFile("current")
    console.log(`This error is from creating the post ${error}`);
    
  }
};

//Querying all the posts(Read)
export const getRecentPosts = async () => {
  try {
    const Posts = await database.listDocuments(
      AppwriteConfig.databaseID,
      AppwriteConfig.postCollectionID,
      [Query.orderDesc("$createdAt"),Query.limit(20)],
    );
    if (Posts) return Posts;
  } catch (error) {
    console.log(
      `The given error is from fetching the posts from database ${error}`,
    );
  }
};


//================================================================
//********************** Likes and Save  Post Database *************
//=================================================================


export const likePost = async ({ postId, likesArray }: { postId: string, likesArray: string[] }) => {
  try {
    const updatePost = await database.updateDocument(
      AppwriteConfig.databaseID,
      AppwriteConfig.postCollectionID,
      postId,
      {
        likes: likesArray,
      },
    );
    if (!updatePost) throw new Error('Failed to update post');

    return updatePost;
  } catch (error) {
    console.error(`This error is for liking: ${error}`);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const savePost = async (postId:string,userId:string)=>{
  try {
    const data = {
      postId,
      userId
    }

    const savePostRes = await database.createDocument(
      AppwriteConfig.databaseID,
      AppwriteConfig.saveCollectionID,
      ID.unique(),
      data
    )

    if(!savePostRes) throw Error

    return savePostRes;
  } catch (error) {
    console.log(`This error is for saving post ${error}`)
  }
}

export const deleteSavePost = async (savePostId:string)=>{
  try {
    const deleteSavePostRes = await database.deleteDocument(
      AppwriteConfig.databaseID,
      AppwriteConfig.saveCollectionID,
      savePostId
    )
    if(!deleteSavePostRes) throw Error()
      return deleteSavePostRes

  } catch (e) {
    console.log(`This error is for deleting the save post ${e}`)
  }
}