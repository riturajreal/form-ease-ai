import { Trash2, Edit } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FieldEdit = ({ defaultValue, onUpdate, deleteField }) => {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className="flex items-center gap-2">
      {/* EDIT */}
      <Popover>
        <PopoverTrigger>
          <Edit className="h-5 w-5 text-gray-500 " />
        </PopoverTrigger>
        <PopoverContent>
          <h2 className="font-semibold ">Edit Fields</h2>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-xs">Label Name</label>
              <Input
                type="text"
                defaultValue={defaultValue.label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs">Label Name</label>
              <Input
                type="text"
                defaultValue={defaultValue.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>

            <Button
              size="sm"
              className="mt-3"
              onClick={() =>
                onUpdate({
                  label: label,
                  placeholder: placeholder,
                })
              }
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* DELETE */}

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2 className="h-5 w-5 text-red-500 " />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=> deleteField() }>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FieldEdit;
