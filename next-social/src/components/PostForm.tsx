import { useContext, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserContext } from '../../context/UserContext'
import { Button } from './ui/button'
import { ImageIcon, XIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'

const FormSchema = z.object({
  author: z.string(),

  textContent: z.string()
   .min(1)
   .max(260),

  imageUrl: z.string(),
  
  createdOn: z.string().datetime(),

  uid: z.string()
})
function PostForm() {
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const ref= useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change")
    const file = event.target.files?.[0];
    if(file) {
      setPreview(URL.createObjectURL(file))
    }
  };

  const form =  useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      author: "",
      textContent: "",
      createdOn: new Date().toISOString(),
      uid: uuidv4(),
    },
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  }


  return (
    <div className="mb-2">
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit)} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.profilePictureUrl}/>
            <AvatarFallback>
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input         
           type="text"
           name="textContent"
           placeholder="Start writing a post..."
           className="flex-1 outline-none rounded-full py-3 px-4 border dark:bg-slate-800"
          /> 

          <input
           ref={fileInputRef}
           type="file"
           name="image" 
           accept="image/*" 
           hidden
           onChange={handleImageChange} 
          />

          <button type="submit" hidden>
            Post
          </button>
        </div>

        {preview && (
          <div>
            <img src={preview} alt="Preview" className="w-full object-cover"/>
          </div>
        )}

        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} image
          </Button> 

          {preview && (
            <Button
             variant="outline"
             type="button"
             onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>

      <hr className="mt-2 border-slate-300" />
    </div>
  )
}

export default PostForm