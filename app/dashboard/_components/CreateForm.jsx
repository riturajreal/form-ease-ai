"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { AiChatSession } from '@/configs/AiModal'

  
const PROMPT = ", On the basis of description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, fieldType, field required In Json format";

// create new form
const CreateForm = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading]= useState(false);

    // onCreate
    const onCreateFrom =async()=> {
        // console.log(userInput);

        setLoading(true);
        // GEMINI Response
       const result =  await AiChatSession.sendMessage("Description:"+userInput+PROMPT)
       console.log(result.response.text());

       if(result.response.text()) {
        setLoading(false);
       }

       setLoading(false);
    }

  return (
    <div>
    <Button onClick={()=> setOpenDialog(true)}>+ Create Form</Button>
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New form</DialogTitle>
        <DialogDescription>
        <Textarea className='resize-none my-2'placeholder='Write Description of your Form'
            onChange={(event)=> setUserInput(event.target.value)}
         />
        <div className='flex gap-2 my-3 justify-end'>
            <Button onClick={()=>setOpenDialog(false)} variant='destructive'>Cancel</Button>
            <Button disabled ={loading} onClick={(onCreateFrom)}>Create</Button>
        </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  </div>
  )
}

export default CreateForm