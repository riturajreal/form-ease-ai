import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormUi = ({ jsonForm }) => {
  return (
    <div className="border rounded-lg p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h3 className="text-sm text-gray-500 mb-5 text-center">
        {jsonForm?.formSubheading}
      </h3>

      {jsonForm?.fields?.map((field, index) => (
        <div className="my-3">
          {/* SELECT FIELD TYPE */}
          {field?.fieldType == "select" ? (
            <div>
              <label className="text-xs text-gray-500">
                {field?.fieldLabel}
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div>
            <label className="text-xs text-gray-500">
               {field?.fieldLabel}
              </label>
              <RadioGroup>
              {field.options.map((item,index)=>(
                <div key={index} className="flex items-center space-x-4">
                  <RadioGroupItem value={item.label} id={item.label} />
                  <Label htmlFor={item.label}>{item }</Label>
                </div>
              ))}
              </RadioGroup>
            </div>
          ) : (
            /* TEXT FIELD TYPE */
            <div>
              <label className="text-xs text-gray-500">
                {field?.fieldLabel}
              </label>
              <Input
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormUi;