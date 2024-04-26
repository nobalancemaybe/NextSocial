
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import UserButton from "./UserButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { HomeIcon, MessageSquareIcon, SearchIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";

export default function Header() {
  const userContext = useContext(UserContext)
  
  return (
    <header className="sticky border-b top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-2 pl-2 
      bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1">
          <form className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex-1 mx-2 max-2-96">
            <SearchIcon className="h4 " />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-1 outline-none"
            /> 
          </form>
        </div>
        <div className="flex items-center justify-end px-6 space-x-4">
          {userContext?.user && (
            <>
              <Link to="/">
                <HomeIcon className="text-black dark:text-white " />
              </Link>
              <Link to="/chat">
                <MessageSquareIcon className="text-black dark:text-white "/>
              </Link>
              <CreateChatButton />
            </>
          )}

          <DarkModeToggle />

          <UserButton />
        </div>
      </nav>
    </header>
  )
}
