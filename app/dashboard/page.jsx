'use client'
import React, { useEffect } from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

const page = () => {

  return (
    <div className='p-6'>
      <h2 className='flex items-center justify-between font-bold text-3xl'>
        Dashboard
        <CreateForm/>
      </h2>

      {/* List of Forms */}
      <FormList/>
    </div>
  )
}

export default page