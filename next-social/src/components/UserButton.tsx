import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import { RegistrationForm } from "./RegistrationForm.tsx"
import { useToast } from "./ui/use-toast.ts"
import { useNavigate } from "react-router"
import { logoutUser } from "../../services/auth.service.ts"
import Login from "./Login.tsx"


function UserButton() {
  const userContext = useContext(UserContext)
  const { toast } = useToast()
  const navigate = useNavigate()

  const logout = async () => {
    await logoutUser();
    userContext?.setUser(null);
    localStorage.removeItem("user");

    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out.',
    });

    navigate('/');
  };

  if (!userContext?.data) return (
    <>
      <Login />
      <RegistrationForm />
    </>

  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name="Stefan Trajkovski"
          image="https://github.com/shadcn.png"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton