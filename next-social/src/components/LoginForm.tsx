import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getUserByHandle } from "../../services/users.service.ts"
import { useToast } from "./ui/use-toast"
import { loginUser } from "../../services/auth.service.ts"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext.tsx"



const FormSchema = z.object({
  handle: z.string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(15, {
      message: "Username can be up to 15 characters"
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }),

})

export const LoginForm = () => {
  const userContext = useContext(UserContext)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      handle: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const existingUsernameSnapshot = await getUserByHandle(data.handle);
      const userData = existingUsernameSnapshot.val();
      const userEmail = userData.email;

      loginUser(userEmail, data.password);
      
      userContext?.setUser({ ...userData})
      
      toast({
        title: 'Log In Successful',
        description: 'You have successfully logged in.',
      });
    } catch (error) {
      toast({
        title: 'Log In Error',
        description: "description error.message",
      });
    }


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">

        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username or email" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center mt-6 mb-2 lg:mt-12 lg:mb-4">
          <Button type="submit" className="lg:px-8 lg:py-2 lg:text-xl lg:shadow-md">
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
