// import { UserContext } from "../../context/UserContext"
// import { useContext } from "react"
import { Avatar, AvatarFallback, } from "./ui/avatar"


function UserInformation() {
  // const userContext = useContext(UserContext)

  return (
    <div >
      <Avatar>
        {/* <AvatarImage src={userContext?.data?.imageUrl} /> */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserInformation