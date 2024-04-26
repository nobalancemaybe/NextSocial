
// import { UserContext } from "../../context/UserContext.tsx"
// import { useContext } from "react"

import PostForm from "@/components/PostForm"
import UserInformation from "@/components/UserInformation"
import HomePageBackground from "@/components/ui/home-page-background"

function HomePage() {
  // const userContext = useContext(UserContext)

  return (

    <main className="">
      <HomePageBackground/>
      <div className="grid grid-cols-8 mt-5 sm:px-5">
        <section className="hidden md:inline md:col-span-2">
         <UserInformation />
        </section>

        <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
          {/* Post form*/}
          <PostForm />
          {/* Post feed*/}
        </section>

        <section className="hidden xl:inline justify-center col-span-2">
          {/* Widget*/}

        </section>
      </div>
    </main>

  )
}

export default HomePage