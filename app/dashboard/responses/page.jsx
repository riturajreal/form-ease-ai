"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp'
import Loader from '@/app/_components/Loader'

const Responses = () => {

const {user} = useUser();

// get all forms
const [formList, setFormList]  = useState([]);

const [loading, setLoading] = useState(true);



    useEffect(()=> {
        user&&getFormList();
    }, [user])

    const getFormList = async()=> {
      setLoading(true);

        const result = await db.select().from(JsonForms)
        .where(
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress )
        )
        setFormList(result);
        console.log(result);

        setLoading(false);
    }


  return (
    <div className='p-6'>
      <h2 className='font-bold text-3xl'>
        Responses
      </h2>

      {loading ? (
      <div className='flex items-center justify-center'>
          <Loader />
        </div>


    ) :

    <div className='my-5 grid grid-cols-2 gap-5 lg:grid-cols-3 '>
        {formList.map((form, index)=>(
            <FormListItemResp
                formRecord={form}
                jsonForm={JSON.parse(form.jsonform)}
            />
        ))}
    </div>
  }
   
    </div>
  )
}

export default Responses