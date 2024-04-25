
// import { UserContext } from "../../context/UserContext.tsx"
// import { useContext } from "react"

import UserInformation from "@/components/UserInformation"
import HomePageBackground from "@/components/ui/home-page-background"

function HomePage() {
  // const userContext = useContext(UserContext)

  return (

    <main className="">
      <HomePageBackground/>
      <div className="grid">
        <section> {/* User information*/}
         <UserInformation />
        </section>

        <section>
          {/* Post form*/}
          {/* Post feed*/}
        </section>

        <section>
          {/* Widget*/}

        </section>
      </div>
    </main>

  )
}

export default HomePage