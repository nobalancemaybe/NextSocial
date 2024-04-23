import Login from "@/components/Login"
import { UserContext } from "../../context/UserContext.tsx"
import { useContext } from "react"

function HomePage() {
  const userContext = useContext(UserContext)

  return (
    <>
      <div>HomePage</div>
      {!userContext?.data && (<Login />)}
    </>
  )
}

export default HomePage