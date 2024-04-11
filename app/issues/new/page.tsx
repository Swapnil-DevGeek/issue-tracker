"use client";
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from 'react';
import axios from "axios"
import { useRouter } from 'next/navigation';

const NewIssuePage = () => {

    const router = useRouter();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
     
    const issue = {
        title,
        description
    }

    async function handleSubmit() {
        await axios.post('/api/issues',issue);
        router.push('/issues');
    }

  return (
  
        <div className='max-w-lg space-y-3'>
            <TextField.Root placeholder="Title" size='2' 
            onChange={(e)=>setTitle(e.target.value)} />
            
            <SimpleMDE placeholder="Description"
             onChange={(e)=>setDescription(e)}/>
            <Button onClick={handleSubmit}
            className='cursor-pointer'>Submit New Issue</Button>
        </div>
   
  )
}

export default NewIssuePage
