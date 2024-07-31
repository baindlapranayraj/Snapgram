import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../../../_auth/import/ImportShad";
import { Textarea } from "../../../@/components/ui/textarea";
import FileUploader from "./FileUploader";
import { Models } from "appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema } from "../../../@/lib/validation";
import { z } from "zod";
import { useCreatePost } from "../../../TanstackQuery/queryMutation";
import { toast } from "../../../@/components/ui/use-toast";
import { useAuthContext } from "../../../context/AuthContext";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PostFormType = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormType) => {
  const form = useForm({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const { user } = useAuthContext();

  const { mutateAsync: createPost, isPending } = useCreatePost();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof PostFormSchema>) => {
    if (data.caption === "") {
      toast({
        title: "Kindly Enter your thougts",
      });
      return;
    }

    // console.log(data);
    try {
      const ResDoc = await createPost({
        accountId: user.id,
        ...data,
      });

      if (ResDoc) {
        // console.log(ResDoc);
        toast({
          title: "Posted SuccessFull",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fatal Error!! Try to create Agian",
      });
    }
  };

  return (
    <div className=" mt-7 flex items-center justify-center w-[500px] ml-14">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full "
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad_form_label font-medium">
                  Caption
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-zinc-900 border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad_form_label font-medium">
                  Add Photos
                </FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad_form_label font-medium">
                  Add Location
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-zinc-900 border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad_form_label font-medium">
                  Add Tags("seperated by , ")
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-zinc-900 border-transparent "
                    {...field}
                    placeholder="Art,Expression and Learn"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="ButtonGrp flex gap-3 justify-end">
            <Button variant={"destructive"} className="w-28">
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"secondary"}
              className={`bg-purple-400 text-white hover:bg-purple-500 w-28 ${isPending ? "cursor-progress" : ""}`}
            >
              {isPending ? <Loader /> : <p>Submit</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
