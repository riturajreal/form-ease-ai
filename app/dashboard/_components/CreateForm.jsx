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
import { useUser } from '@clerk/nextjs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment'
import { db } from '@/configs'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Confetti from 'react-dom-confetti';


  
const PROMPT=",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format"

// create new form
const CreateForm = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading]= useState(false);
    const {user} = useUser();
    const route = useRouter();

    const [confetti, setConfetti] = useState(false);


    // onCreate
    const onCreateFrom =async()=> {
        // console.log(userInput);

        setLoading(true);
        // GEMINI Response
       const result =  await AiChatSession.sendMessage("Description:"+userInput+PROMPT);
    //    console.log(result.response.text());

       if(result.response.text()) {
        const resp = await db.insert(JsonForms).values({
            jsonform:result.response.text(),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/YYYY')
            
        }).returning({id:JsonForms.id});
        // console.log(resp);

        // redirecting to form using router
        if(resp[0].id){
          setConfetti(true); // Trigger confetti animation
  setTimeout(() => {
    route.push('/edit-form/' + resp[0].id); // Redirect after a delay
  }, 1000); // Delay time in milliseconds
        }

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
            <Button disabled={loading} onClick={onCreateFrom}>
      {loading ? (
        <Loader2 className="animate-spin"/>
      ) : (
        'Create'
      )}
    </Button>
        </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
 <Confetti
  active={confetti}
  config={{
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    decay: 0.95,
    zIndex: 1000,
  }}
/>

  </div>
  )
}

export default CreateForm