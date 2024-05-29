import { Button } from '@/components/ui/button'
import { Edit, Share2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'


const FormListItem = ({formRecord, jsonForm, refreshData}) => {

  const {user}=useUser();

    const onDeleteForm=async()=>{
        const result=await db.delete(JsonForms)
        .where(and(eq(JsonForms.id,formRecord.id),
        eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))
        
        if(result)
        {
            toast('Form Deleted!!!');

            // refresh parent component
            refreshData()
        }
    }
  return (
    <div className="border shadow-sm rounded-lg p-4 hover:shadow-xl duration-150">
      <div className="h-[100px]">
        <h2 className="font-semibold text-lg">{jsonForm?.formTitle}</h2>
        <p className="text-sm text-gray-500">{jsonForm?.formHeading}</p>
      </div>

      <div className="mt-4 flex gap-4 justify-between ">

      {/* Web share */}
      <RWebShare
        data={{
          text: jsonForm?.formHeading + "Build your form in seconds using AI Builder",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
          title: jsonForm?.formTitle,
        }}
        disableNative={true}
        onClick={() => console.log("shared successfully!")}
      >
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 "
        >
          <Share2 className="h-5 w-5" /> Share
        </Button>
      </RWebShare>


        <div className="flex items-center gap-4">
          {/* Edit */}
          <Link href={"/edit-form/" + formRecord?.id}>
            <Button size="sm" className="flex items-center gap-2 ">
              <Edit className="h-5 w-5" />
              Edit
            </Button>
          </Link>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="secondary" size="sm">
            <Trash2 className="text-red-500 h-5 w-5" />
          </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>onDeleteForm()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

         
        </div>
      </div>
    </div>
  );
}

export default FormListItem