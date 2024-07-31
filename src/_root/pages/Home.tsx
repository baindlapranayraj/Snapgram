import { LoaderPinwheel, Edit } from 'lucide-react';
import {   useGetRecentPosts } from "../../TanstackQuery/queryMutation";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useDateTransfer } from '../components/constantsLinks/DateTransfer';
import { Link } from 'react-router-dom';
import {buttonVariants,cardContainerVariants,cardVariants,loaderVariants} from "../import/HomeAnimation"
import PostStats from '../components/PostStats';
import { Models } from 'appwrite';
// import { Models } from 'appwrite';


function Home() {
  const { data, isLoading, isError } = useGetRecentPosts();

  useEffect(() => {
    if (data) {
      console.log("All Post Querys", data.documents);
    }
  }, [isLoading, data]);

  const { user } = useAuthContext();

  return (
    <div className="container mx-auto px-4 py-4 space-y-3 mt-10 ml-72">
      <h1 className={`font-semibold text-2xl`}>Home Feed</h1>
      {isLoading && !data ? (
        <div className="flex justify-center items-center h-screen">
          <motion.div
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
          >
            <LoaderPinwheel className="w-12 h-12 animate-spin text-purple-600" />
          </motion.div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-600">
          <p>Error loading tweets. Please try again later.</p>
        </div>
      ) : (
        <motion.div
          className="space-y-5 w-full ml-20"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.documents.map((tweet:Models.Document) => (
            <motion.div
              key={tweet.$id}
              variants={cardVariants}
              className="p-4 pb-8 bg-zinc-900 w-1/2 h-1/2 text-white shadow-xl rounded-lg transform transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Link to={`/profile/${tweet.creator.$id}`}>
                  <img src={`${tweet.creator.imageUrl}`} className='w-10 h-10 rounded-full' alt={`${user.name}'s avatar`} />
                </Link>
                <div>
                  <h1 className="text-base font-semibold">{tweet.creator.name}</h1>
                  <h2 className="text-xs text-gray-400">@{tweet.creator.username}</h2>
                </div>
                <span className="ml-auto text-gray-500 text-xs">
                  {useDateTransfer(tweet.$createdAt)}
                </span>
              </div>
              <p className="text-base mb-3">{tweet.caption}</p>
              <div className="location-tags flex justify-between">     
              <p className="text-xs text-gray-400 mb-3 ">
                {tweet.tags.map((tag: string, id: number) => (
                  <span className='ml-1' key={id}>#{tag}</span>
                ))}
              </p>
              <span className='text-xs text-gray-400 mb-3 '>{tweet.location}</span>
              </div>
              {tweet.imageUrl && (
                <div className="mb-3">
                  <Link to={`/post-details/${tweet.$id}`}>
                    <img className=' object-cover rounded-lg' src={tweet.imageUrl} alt="Tweet media" />
                  </Link>
                </div>
              )}
              <div className="flex items-center justify-between mt-1">
                <PostStats post={tweet} userId={user.id}/>  
                <motion.button
                  className={`flex items-center text-gray-400 hover:text-green-500 transition-colors duration-200 ${user.id === tweet.creator.$id ? "" : "hidden"}`}
                  variants={buttonVariants}
                  whileHover="hover"
                >
                  <Link to={`/update-post/${tweet.$id}`} className='flex items-center'>
                    <Edit className="w-5 h-5 mr-1" />
                    <span className="hidden md:inline text-sm">Edit</span>
                  </Link>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Home;
