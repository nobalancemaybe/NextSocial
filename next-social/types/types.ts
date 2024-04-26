
import {z} from "zod"
import { FormSchema } from "../src/components/RegistrationForm.tsx"


const registrationData = FormSchema.omit({ password: true , });
export type UserData = z.infer<typeof registrationData>;

export type RegistrationData = z.infer<typeof registrationData>;

export type User ={
  handle: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  createdOn: string;
  uid: string;
  likedPosts?: object;
  profilePictureUrl?: string;
}

export type Post = {
  author: string;
  content: string;
  createdOn: string;
  likedBy: object;
}