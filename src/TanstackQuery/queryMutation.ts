import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { INewUser } from "../types";
import { CreateAccount, CheckAccount, DeleteAccount } from "../appwrite/Authentication";
import { SingupType } from "../@/lib/validation";
import { CreatePostType, deleteSavePost, getRecentPosts, likePost, PostCreateDB, savePost } from "../appwrite/Database";
import { QUERY_KEYS } from "./queryEnums";


export const queryClient = new QueryClient();


//================================================================
//**********************User Account Querys **********************
//=================================================================

//Creating Account Query
export const useCreateuserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => CreateAccount(user),
  });
};

//Login Account Query
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: SingupType) => CheckAccount(user),
  });
};

//LoggingOut Account Query
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: DeleteAccount
  });
};




//================================================================
//**********************User Post Querys **********************
//=================================================================

//Creating the post query
export const useCreatePost = ()=>{
  return useMutation({
    mutationFn:(data:CreatePostType)=>PostCreateDB(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}

//Get all posts query
export const useGetRecentPosts = ()=>{
  return useQuery({
    queryKey:[QUERY_KEYS.GET_POSTS],
    queryFn:getRecentPosts
  })
}


//================================================================
//********************** Like & Save Post Querys **********************
//=================================================================

//Liking the post query
type likeType = {
  postId:string,
  likesArray:string[]
}

export const useLikePost = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:({postId,likesArray}:likeType)=>likePost({postId,likesArray}),
    onSuccess:(data)=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID,data?.$id]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
} 

export const useSavePost = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:({postId,userId}:{postId:string,userId:string})=>savePost(postId,userId),
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
} 

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavePost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
