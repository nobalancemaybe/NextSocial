import { useContext, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserContext } from '../../context/UserContext'
import { Button } from './ui/button'
import { ImageIcon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { uploadImage } from '../../services/image.service'



function PostForm() {
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const ref= useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const file = event.target.files?.[0];
    if(file) {
      setPreview(URL.createObjectURL(file))
    }
  };

  const form =  useForm({
    defaultValues: {
      author: user?.handle,
      textContent: "",
      createdOn: new Date().toISOString(),
      uid: uuidv4(),
      image: undefined,
    },
  })

  const onSubmit = async (data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const dataCopy = data;
    ref.current?.reset();
    console.log(dataCopy, "1")
    try {
      // Check if there's an image to upload
      let imageUrl: string | undefined = "";
      if (dataCopy.image) {
        const imageFile = fileInputRef.current?.files?.[0];
        if (imageFile) {
          // Upload image to Firebase Storage
          imageUrl = await uploadImage(imageFile);
        }
      }
  
      // Merge form data with imageUrl
      const postData = { ...data, imageUrl };
  
      // Handle form submission (e.g., save data to database)
      console.log("Submitted data:", postData);
      // Add your logic to save postData to your database or API
  
      // Reset form after submission
     
      setPreview(null); // Clear preview
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to the user)
    }
  }


  return (
    <div className="mb-2">
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit)} className="p-3 bg-white dark:bg-slate-600 rounded-lg">
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

          <Button
           type="submit"
           variant="secondary">
            Post
          </Button>
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