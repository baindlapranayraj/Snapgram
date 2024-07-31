import { motion } from "framer-motion";
import { buttonVariants } from "../import/HomeAnimation";
import { Bookmark, Heart } from "lucide-react";
import { Models } from "appwrite";
import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from "../../TanstackQuery/queryMutation";
import React, { useState } from "react";

type PostStateType = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStateType) => {
  const { mutateAsync: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const likeList: string[] = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likeList);
  const [saved, setSaved] = useState(false);

  const likeHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let newLikes = [...likes];
    let hadLiked = newLikes.includes(userId);

    if (hadLiked) {
      newLikes = newLikes.filter((likeId: string) => likeId !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    const likePostRes = await likePost({ postId: post.$id, likesArray: newLikes });
    if (likePostRes) console.log(`Like post got saved in database ${likePost}`);
  };

  const saveHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.stopPropagation();
    // setSaved(!saved);
    // if (!saved) {
    //   await savePost({ postId: post.$id });
    // } else {
    //   await deleteSavePost({ postId: post.$id });
    // }
  };

  return (
    <div className="flex justify-between gap-4">
      <motion.button
        className="flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
        variants={buttonVariants}
        whileHover="hover"
        onClick={likeHandle}
      >
        <Heart className="w-5 h-5 mr-1" />
        <span className="hidden md:inline text-sm ml-1">{likes.length}</span>
      </motion.button>
      <motion.button
        className="flex items-center text-gray-400 hover:text-sky-500 transition-colors duration-200"
        variants={buttonVariants}
        whileHover="hover"
        onClick={saveHandle}
      >
        <Bookmark className="w-5 h-5 mr-1" />
        <span className="hidden md:inline text-sm">save</span>
      </motion.button>
    </div>
  );
};

export default PostStats;
