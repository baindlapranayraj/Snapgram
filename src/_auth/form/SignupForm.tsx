// import React from 'react'
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

import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema, SingupType } from "../../@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../@/components/ui/use-toast";
import { useSignInAccount } from "../../TanstackQuery/queryMutation";
import { Loader } from "lucide-react";

const SignupForm = () => {
  const form = useForm<SingupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const {mutateAsync:checkAccount,isPending} = useSignInAccount()

  const onSubmit: SubmitHandler<SingupType> = async (data) => {
    // console.log(data);
    try {
      const res = await checkAccount(data);
      if (res) {
        console.log(res);
        toast({
          title: "Succsesfull logged in",
        });
        navigate("/");
      }
      else{
        toast({
          variant:"destructive",
          description:`The Given info is not valid`
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request to signIn",
      });
      console.error(`The Error form checking the user account ${error}`);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-full gap-5"
        >
          <div className="imageContainer sm:w-420 flex flex-col justify-center items-center gap-7">
            <img src="images/SocialMediaAppLogo.svg" alt="logo" />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="text-white bg-neutral-900 w-80 focus:outline-zinc-700 border-none outline-none py-6"
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
                      className="text-white bg-neutral-900 w-80 focus:outline-zinc-700 border-none outline-none py-6"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={`w-80 hover:bg-purple-800 ${isPending ? ("cursor-progress"):("")}`}>
              {(isPending)?(
                <Loader/>
              ):(<p>Submit</p>)}
            </Button>
          </div>
          <p className="text-white">
            Are you new user?{" "}
            <Link
              className="text-purple-800 cursor-pointer ml-1 font-semibold duration-200"
              to={"/sign-in"}
            >
              Create Your Account.
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
