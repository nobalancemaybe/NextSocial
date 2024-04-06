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


function UserButton() {
  const userContext = useContext(UserContext)

  if(!userContext?.data) return (   
      <RegistrationForm/>
    
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
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserButton