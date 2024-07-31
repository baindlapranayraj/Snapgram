import { z, ZodType } from "zod";

export type SigninType = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type SingupType = Omit<SigninType, "username" | "name">;

export const SigninSchema: ZodType<SigninType> = z.object({
  username: z.string().min(3, { message: "tooshort" }),
  name: z.string().min(3, { message: "tooshort" }).max(128,{message:'too long'}),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Write Password above 4 Characters" })
    .max(256, { message: "Write Password below 12 Characters" }),
});

export const SignupSchema: ZodType<SingupType> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Write Password above 4 Characters" })
    .max(12, { message: "Write Password below 12 Characters" }),
});


export const PostFormSchema = z.object({
  caption:z.string().min(5).max(200),
  file :z.custom<File[]>(),
  location:z.string().min(2).max(100),
  tags:z.string()
})
