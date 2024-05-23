"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const EditForm = ({params}) => { // params return form ID

  // current user
  const {user} = useUser();

  // Save Data Use which stores array
  const [jsonForm, setJsonForm] = useState([]);

  // to redirect on previous screen
  const router = useRouter();

  useEffect(()=> {
    user&&GetFormData();
  },[user]);

  // get form data
  const GetFormData = async()=> {

    // select data from db based on id and user
    const result = await db.select().from(JsonForms)
    .where(and(eq(JsonForms.id , params?.formId), 
    eq(JsonForms.createdBy ,user?.primaryEmailAddress?.emailAddress ) ));

    // console.log(result);

    // update jsonForm hook -- parse json
    setJsonForm(JSON.parse(result[0].jsonform));

    // console.log(JSON.parse(result[0].jsonform));
    
  }

  return (
    <div className='p-10'>
  <h2 onClick={()=> router.back()} className='flex gap-2 items-center my-5 cursor-pointer hover:font-semibold transition-all'>
    <ArrowLeft/> Back
  </h2>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>

    {/* Controller */}
      <div className='p-4 border rounded-lg shadow-md'>
        Controller 
      </div>

    {/* Form */}
      <div className='md:col-span-2  p-4 h-screen border rounded-lg'>
      Form
      </div>
    </div>
    

    </div>
  )
}

export default EditForm