import { Trash2, Edit } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FieldEdit = ({defaultValue, onUpdate}) => {

    const [label, setLabel] = useState();
    const [placeholder, setPlaceholder] = useState();


  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger><Edit className="h-5 w-5 text-gray-500 " /></PopoverTrigger>
        <PopoverContent>
            <h2 className='font-semibold text-sm'>Edit Fields</h2>
            <div className='flex flex-col gap-4'>
            <div>
                <label className='text-xs'>Label Name</label>
                <Input type='text' defaultValue={defaultValue.label}
                    onChange={(e)=>setLabel(e.target.value)}
                />
            </div>

            <div>
                <label className='text-xs'>Label Name</label>
                <Input type='text' defaultValue={defaultValue.placeholder}
                    onChange={(e)=>setPlaceholder(e.target.value)}
                />
            </div>

            <Button size='sm'
            onClick={()=> onUpdate({
                label:label,
                placeholder:placeholder
            })}
            >Update</Button>
            </div>
        </PopoverContent>
      </Popover>
      
      <Trash2 className="h-5 w-5 text-red-500 " />

    </div>
  );
}

export default FieldEdit