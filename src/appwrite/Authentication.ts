import { ID } from "appwrite";
import { INewUser } from "../types";
import { SingupType } from "../@/lib/validation";
import { account, avatars } from "./conifg";
import { queryDocument, saveUserToDB } from "./Database";

// Creating Account
export const CreateAccount = async ({
  name,
  email,
  password,
  username,
}: INewUser) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error(`Error due to creation of new Account`);

    const avatarURL = avatars.getInitials(name);

    // Linking Auth to Database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: name,
      username: username,
      email: email,
      imageUrl: avatarURL,
    });

    if (newUser) return newUser;
  } catch (error) {
    console.log(`The Error is while creating account ${error}`);
  }
};

//Logging Out
export const DeleteAccount = async () => {
  try {
    const sessionDelete = await account.deleteSession("current");
    if(sessionDelete){
      return sessionDelete
    }
  } catch (error) {
    console.log(error)
  }
};

//Login Authentication
export const CheckAccount = async ({ email, password }: SingupType) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    if (!response) throw new Error(`Account not Created`);

    return response;
  } catch (error) {
    console.error(`The Error is from Checking the Account ${error}`);
  }
};

//Verification
export const VerficationAccount = async () => {
  try {
    const res = await account.get();
    if (!res) console.log(res)
    const currentUser = await queryDocument(res.$id)
    if(currentUser) return currentUser.documents[0];

  } catch (error) {
    console.log(`The Given error is from Verfication of account ${error}`);
    return false;
  }
};
