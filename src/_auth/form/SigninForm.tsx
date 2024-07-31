import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../import/ImportShad";
import { SigninType, SigninSchema } from "../../@/lib/validation";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../@/components/ui/use-toast";
import { useCreateuserAccount, useSignInAccount } from "../../TanstackQuery/queryMutation";
import { useAuthContext } from "../../context/AuthContext";

const SigninForm = () => {
  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const {checkAuth,isLoading} = useAuthContext()

  const { mutateAsync: creatingAcount, isPending:creatingPending } = useCreateuserAccount();

  const {mutateAsync:loginAccount,isPending:signinPending} = useSignInAccount()

  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    // console.log(data);
    const newUser = await creatingAcount(data)

    if(!newUser) {
      toast({ variant:"destructive" , title: "Sign up failed. Please try again.", })
    }

    console.log(newUser)

    const session = await loginAccount({
      email:data.email,
      password:data.password
    });

    if(!session){
      toast({
        variant:"destructive",
        title:"Error Occured while Logging in an account"
      })
      navigate('/sign-in')
      return;
    }

    const isLoggedIn = await checkAuth()

    if(isLoggedIn){
      form.reset();
      toast({
        title:"Creating Account is Succesfull"
      })
      navigate('/');
    }
    else{
     return toast({ variant:"destructive" ,title: "Logging in failed. Please try again." });
    }

  };

  return (
    <Form {...form}>
      <div className="imageContainer sm:w-420 flex flex-col justify-center items-center ">
        <img src="images/SocialMediaAppLogo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white font-semibold text-xl">
          Create your account
        </h2>
        <p className="text-sm text-slate-700">
          To use Snapgram Enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-white bg-neutral-900 w-80 focus:outline-zinc-700 border-none outline-none py-6"
                    placeholder="Jimmy_2002"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-white bg-neutral-900 w-80 focus:outline-zinc-700 border-none outline-none py-6"
                    placeholder="Jimmy_2002"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-white bg-neutral-900 w-full focus:outline-zinc-700 border-none outline-none py-6"
                    placeholder="Jimmy@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-white bg-neutral-900 w-full focus:outline-zinc-700 border-none outline-none py-6"
                    placeholder="######"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className={` duration-100 transition-all ${(creatingPending || isLoading || signinPending) ? "cursor-progress" : "hover:bg-purple-700"}`}
            type="submit"
          >
            {(creatingPending || isLoading || signinPending) ? <Loader /> : <p>Submit</p>}
          </Button>
        </form>
        <p className="text-white mt-2">
          Already have an account?{" "}
          <Link
            to={"/sign-up"}
            className="text-purple-800 cursor-pointer ml-1 font-semibold "
          >
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SigninForm;
