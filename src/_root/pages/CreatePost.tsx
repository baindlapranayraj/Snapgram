import { ImagePlus } from "lucide-react"
import PostForm from "../components/form/PostForm"

const CreatePost = () => {
  return (
    <div className=" flex flex-1 ml-72 mt-14 h-screen">
      <div className="common-container p-4">
        <div className="max-w-5xl flex gap-3 items-center w-full">
          <ImagePlus
            width={45}
            height={45}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full font-semibold text-xl">Create Post</h2>
        </div>
        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost