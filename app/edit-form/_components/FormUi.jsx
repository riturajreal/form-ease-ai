import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";


const FormUi = ({ jsonForm, onFieldUpdate, deleteField, selectedTheme, selectedStyle , editable=true}) => {

  const [formData, setFormData] = useState();
  
  
  // handle Input Field change
  const handleInputChange= (event)=> {

    // destrucing 
    const {name, value} =event.target;

    setFormData({
      ...formData,
      [name]:value
    })
  }


// handle Select and Radio Field Change
const handleSelectChange=(name, value)=> {
  setFormData({
    ...formData,
    [name]:value
  })
  
}

// handle Checkbox Change
const handleCheckboxChange=(fieldName, itemName, value )=> {
  console.log(fieldName, itemName, value);
}




  // onSubmit
  const onFormSubmit=(event)=> {
    event.preventDefault()
    console.log(formData);
  }

  return (
    <form 
    onSubmit={onFormSubmit}
    className="border rounded-md p-5 md:w-[600px]" data-theme={selectedTheme} 
    style={{
      boxShadow: selectedStyle?.key=='boxshadow'&& '5px 5px 0px black',
      border:selectedStyle?.key=='border'&&selectedStyle.value
    }}
     >
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h3 className="text-sm text-gray-500 mb-5 text-center">
        {jsonForm?.formHeading}
      </h3>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* SELECT FIELD TYPE */}
          {field?.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Select required = {field?.required} 
              onValueChange={(v)=> handleSelectChange(field.fieldName,v)}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field?.options?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <RadioGroup required = {field?.required}> 
                {field?.options?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <RadioGroupItem value={item.label} id={item.label}
                    onClick={()=> handleSelectChange(field.fieldName, item.label)}
                     />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.label}</label>
              {field?.options ? (
                field?.options?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox onCheckedChange={(v)=> handleCheckboxChange(field?.label, item, v)} />
                    <h2>{item.label ? item.label : item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field.required} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.label}</label>
              <Input className='bg-transparent'
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                required = {field?.required}
                onChange={(e)=> handleInputChange(e)}
              />
            </div>
          )}


      {editable && <div>
            <FieldEdit defaultValue={field}
              onUpdate={(value)=> onFieldUpdate(value,index)}
              deleteField={()=>deleteField(index)}
            />
          </div>
      }

        </div>
      
      ))}

{/* SUBMIT BUTTOM */}
    <button type='submit' className="btn btn-primary">Submit</button>
    </form>
  );
};

export default FormUi;
