
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useEffect, useState, useContext } from "react"
import { createUserHandle, getUserByHandle } from "../../services/users.service.ts"
import { registerUser } from "../../services/auth.service.ts"
import { UserContext } from "../../context/UserContext.tsx"
import { useToast } from "./ui/use-toast.ts"
import { UserData } from "types/types.ts"

export const FormSchema = z.object({
  handle: z.string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(15, {
      message: "Username can be up to 15 characters"
    })
    .regex(/^[a-zA-Z0-9_.+-]+$/, {
      message: "Username is not valid"
    }),

  email: z.string()
    .email({
      message: "Invalid email"
    }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }),

  firstName: z.string()
    .min(2, {
      message: "Name must be at least 2 characters."
    })
    .max(15, {
      message: "Name can be up to 15 characters"
    })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Username is not valid"
    }),
  lastName: z.string()
    .min(2, {
      message: "Name must be at least 2 characters."
    })
    .max(15, {
      message: "Name can be up to 15 characters"
    })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Username is not valid"
    }),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Choose other if you don't want to specify",
  }),

  createdOn: z.string().datetime(),

  uid: z.string()
})

export const RegistrationForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const userContext = useContext(UserContext)
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      handle: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: undefined,
      createdOn: new Date().toISOString(),
      uid: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    const user = await getUserByHandle(data.handle);
    if (user.exists()) {
      toast({
        title: 'Registration not successful',
        description: 'User already exists.',
      });
      return console.log(`Handle  already exists`);
    }

    const credentials = await registerUser(data.email, data.password);

    const userData: UserData = {
      handle: data.handle,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      createdOn: data.createdOn,
      uid: credentials.user.uid
    }
    
    await createUserHandle(userData);

    userContext?.setUser({ ...userData})
    setIsDialogOpen(false)

    toast({
      title: 'Registration Successful',
      description: 'You have successfully registered.',
    });
  }

  useEffect(() => {
    form.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen])
  return (


    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center text-xl md:text-2xl lg:text-3xl w-full h-auto md:w-3/4 lg:w-1/2 md:h-auto lg:h-auto ">

        <DialogHeader className="flex items-center">
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Creating a new account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">

            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Public by default
                  </FormDescription>
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
                  <FormDescription>
                    Don't forget your password  😃
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose your gender</FormLabel>
                  <div>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row space-y-1 md:justify-between"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Female
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center mt-6 mb-2 lg:mt-12 lg:mb-4">
              <Button type="submit" className="lg:px-8 lg:py-2 lg:text-xl lg:shadow-md">
                Create your account
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>

    </Dialog>

  )
}
