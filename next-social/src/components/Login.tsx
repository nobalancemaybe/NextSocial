import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

function Login() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
    <DialogTrigger asChild>
      <Button variant="outline">
        Login
      </Button>
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center text-xl md:text-2xl lg:text-3xl w-full h-auto md:w-3/4 lg:w-1/2 md:h-auto lg:h-auto ">

      <DialogHeader className="flex items-center">
        <DialogTitle>Login</DialogTitle>
        
      </DialogHeader>
        <LoginForm />
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

export default Login