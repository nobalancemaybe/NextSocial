import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = ({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image && (
        <AvatarImage
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback
        delayMs={1000}
        className="bg-white text-black text-lg">
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar