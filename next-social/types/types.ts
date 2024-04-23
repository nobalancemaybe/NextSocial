
import {z} from "zod"
import { FormSchema } from "../src/components/RegistrationForm.tsx"


const registrationData = FormSchema.omit({ password: true , });
export type UserData = z.infer<typeof registrationData>;

export type User = {
  uid: string;
  email: string;
  handle: string;
  likedPosts: object;
}

export type Post = {
  author: string;
  content: string;
  createdOn: string;
  likedBy: object;
}