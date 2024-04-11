"use client";
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from 'react';
import axios from "axios"
import { useRouter } from 'next/navigation';


const NewIssuePage = () => {

    const router = useRouter();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const [error,setError] = useState('');
    const [submitting,setSubmitting] = useState(false); 

    const issue = {
        title,
        description
    }

    async function handleSubmit() {
        try {
            setSubmitting(true);
            await axios.post('/api/issues',issue);
            router.push('/issues');
            setError('');
            setTitle('');
            setDescription('');

        } catch (error) {
            setError('Title or Description cannot be empty!');
            setSubmitting(false);
        }
    }

  return (
        <div className='flex justify-center items-center flex-col'>
            <div className='max-w-lg mb-5'>
                {error && <Callout.Root color='red' >
                        <Callout.Text>
                            {error}
                        </Callout.Text>
                    </Callout.Root>}
            </div>
            <div className='max-w-lg space-y-3'>
                <TextField.Root placeholder="Title" size='2' 
                onChange={(e)=>setTitle(e.target.value)} />
                
                <SimpleMDE placeholder="Description"
                onChange={(e)=>setDescription(e)}/>
                <Button disabled={submitting}
                 onClick={handleSubmit}
                 className='cursor-pointer'>
                    Submit New Issue {submitting && <Spinner/>} 
                 </Button>
            </div>
        </div>
  )
}

export default NewIssuePage
