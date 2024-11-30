import { Edit, TrashIcon } from "lucide-react";
import React, { useState } from "react";
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
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FieldEdit = ({ defaultValue, onUpdate, deleteField }) => {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger className="bg-transparent p-0 hover:border-none">
          <Edit className="h-4 text-gray-400 hover:text-gray-600 w-4" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div className="my-3">
            <label className="text-xs my-2">Label Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          {defaultValue.placeholder && (
            <div>
              <label className="text-xs my-2">Placeholder Name</label>
              <Input
                type="text"
                defaultValue={defaultValue.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
          )}
          <Button
            size="sm"
            className="mt-3"
            onClick={() =>
              onUpdate({
                label: label,
                placeholder: placeholder ? placeholder : undefined,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
      <AlertDialog>
        <AlertDialogTrigger className="p-0 m-0 hover:border-none border-none bg-transparent">
          <TrashIcon className="h-4 text-red-400 hover:text-red-600 w-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete your form field and
              remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteField()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FieldEdit;
