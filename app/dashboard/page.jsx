import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'

const page = () => {
  return (
    <div className='p-10'>
      <h2 className='flex items-center justify-between font-bold text-3xl'>
        Dashboard
        <CreateForm/>
      </h2>
    </div>
  )
}

export default page