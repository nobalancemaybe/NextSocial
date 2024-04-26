import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import { Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import Login from "./Login"


function UserInformation() {
  const userContext = useContext(UserContext)
  const firstName = userContext?.user?.firstName
  const lastName = userContext?.user?.lastName

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-slate-800 mr-6 rounded-lg border py-4" >
      <Avatar>
        {userContext?.user ? (
          <AvatarImage src={userContext?.user?.profilePictureUrl}/>
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" />
        )
        
        }
        <AvatarFallback>
          {firstName?.charAt(0)}
          {lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      {userContext?.user ? (
        <div className="text-center">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>

          <p className="text-xs">
            @{firstName}
            {lastName}-{userContext.user.handle.slice(-4)}
          </p>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in</p>

          <Login />
        </div>
      )}

      <hr className="w-full border-slate-200 dark:border-slate 700 my-5" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400 ">Posts</p>
        <p className="text-blue-400">0</p>
      </div>

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400 ">Comments</p>
        <p className="text-blue-400">0</p>
      </div>
    </div>
  )
}

export default UserInformation