import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
  
        <div className='max-w-lg space-y-3'>
            <TextField.Root placeholder="Title" size='2' />
            <TextArea placeholder="Description" />
            <Button className='cursor-pointer'>Submit New Issue</Button>
        </div>
   
  )
}

export default NewIssuePage
