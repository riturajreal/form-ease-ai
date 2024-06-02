
"use client"
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';
import Loader from '@/app/_components/Loader';


const FormList = () => {

    const {user} = useUser();

    // store form data
    const [formList, setFormList]  = useState([]);

    // loading
    const [loading, setLoading] = useState(true);


    useEffect(()=> {
            user&&GetFormList()
    }, [user])


    // get form data
    const GetFormList = async()=> {
      setLoading(true);

        const result = await db.select().from(JsonForms)
        .where(
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        ).orderBy(desc(JsonForms.id));

        setFormList(result);
        console.log(result);

        setLoading(false);
    }
  return (
    <div className='my-5 grid grid-cols-2 lg:grid-cols-3 gap-5'>
    
    {loading ? (
      <div className='col-span-2 lg:col-span-3 flex items-center justify-center'>
          <Loader />
        </div>

      )  : formList.length === 0 ? (
        <div className="flex flex-col items-center justify-center col-span-2 lg:col-span-3 ">
          <img src="/empty.gif" alt="Illustration" className="w-64 h-64 mb-4" />
          <p className="font-semibold text-lg text-gray-900">You have not created any Form</p>
          <p className="font-md text-gray-600">Create a new form to Get Started</p>
        </div>

    ) :  formList.map((form,index)=>(
            <div key={index}>
                <FormListItem 
                jsonForm={JSON.parse(form.jsonform)}
                formRecord  = {form}
                // to refresh form after deletion
                refreshData={GetFormList}

                />
           </div>
        ))
    
    }

    
    </div>
  )
}

export default FormList