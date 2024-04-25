import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { MessageSquarePlusIcon } from "lucide-react"

function CreateChatButton() {
  const createNewChat  = async () => {
    <Link to="/chat/chatId"></Link>
  }
  return (
    <Button onClick={createNewChat} variant="ghost">
      <MessageSquarePlusIcon />
    </Button>
  )
}

export default CreateChatButton