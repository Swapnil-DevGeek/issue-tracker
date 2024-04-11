"use client";
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
  
        <div className='max-w-lg space-y-3'>
            <TextField.Root placeholder="Title" size='2' />
            <SimpleMDE placeholder="Description" />
            <Button className='cursor-pointer'>Submit New Issue</Button>
        </div>
   
  )
}

export default NewIssuePage
