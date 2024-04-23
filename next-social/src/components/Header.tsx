
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import UserButton from "./UserButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { MessageSquareIcon } from "lucide-react";

export default function Header() {
  const userContext = useContext(UserContext)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 
      bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {userContext?.data && (
            <>
              <Link to="/chat">
                <MessageSquareIcon />
              </Link>
            </>
          )}

          <DarkModeToggle />

          <UserButton />
        </div>
      </nav>
    </header>
  )
}
