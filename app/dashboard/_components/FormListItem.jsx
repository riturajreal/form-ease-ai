import { Button } from '@/components/ui/button'
import { Edit, Share2 } from 'lucide-react'
import React from 'react'

const FormListItem = ({jsonForm}) => {
  return (
    <div className=' w-full border shadow-sm rounded-lg p-4 h-[220px]'>
        <h2 className='font-semibold text-lg'>{jsonForm?.formTitle}</h2>
        <h2 className='text-sm text-gray-500 '>{jsonForm?.formHeading}</h2>

        <div className='mt-4 flex gap-2 justify-end'>
            <Button><Share2 className="h-5 w-5" /> Share</Button>
            <Button><Edit className="h-5 w-5" />Edit</Button>
        </div>
    </div>
  )
}

export default FormListItem