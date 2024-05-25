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

import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";

const FormUi = ({ jsonForm }) => {
  return (
    <div className="border rounded-lg p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h3 className="text-sm text-gray-500 mb-5 text-center">
        {jsonForm?.formSubheading}
      </h3>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* SELECT FIELD TYPE */}
          {field?.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Select>
                <SelectTrigger className="w-full">
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
              <RadioGroup>
                {field?.options?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <RadioGroupItem value={item.label} id={item.label} />
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
                    <Checkbox />
                    <h2>{item.label ? item.label : item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.label}</label>
              <Input
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
              />
            </div>
          )}
          <div>
            <FieldEdit defaultValue={field}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormUi;
