
import { Link } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"

function Logo() {
  return (
    <Link to="/" className="overflow-hidden">
      <div className="flex items-center w-72 h-24">
        <AspectRatio
        ratio={16/9}
        className="flex items-center justify-center">
          <img 
          src={"./images/logos/black.svg"} 
          alt="Next" 
          className="dark-filter dark:invert"/>
        </AspectRatio>
      </div>
    </Link>
  )
}

export default Logo