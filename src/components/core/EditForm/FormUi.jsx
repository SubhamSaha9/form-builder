import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import FieldEdit from "./FieldEdit";

const FormUi = ({ jsonForm, onFormUpdate, deleteField }) => {
  const [date, setDate] = useState();
  return (
    <div className="border p-5 md:w-[450px] rounded-lg">
      <h2 className="font-bold text-center text-2xl text-primary">
        {jsonForm?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm?.formHeading}
      </h2>
      {jsonForm &&
        jsonForm?.fields?.map((field, i) => (
          <div key={i} className="flex items-center gap-1">
            {field?.fieldType === "select" ? (
              <div className="my-3 w-full">
                <label
                  htmlFor={field?.fieldName}
                  className="text-xs text-gray-500"
                >
                  {field?.label}
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field?.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options.map((option, indx) => (
                      <SelectItem value={option} key={indx}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === "radio" ? (
              <div className="my-3 w-full">
                <label
                  htmlFor={field?.fieldName}
                  className="text-xs text-gray-500"
                >
                  {field?.label}
                </label>
                <RadioGroup>
                  {field?.options.map(
                    (option,
                    (idx) => (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.Label}
                          id={option.Label}
                        />
                        <Label htmlFor={option.Label}>{option.Label}</Label>
                      </div>
                    ))
                  )}
                </RadioGroup>
              </div>
            ) : field.fieldType === "date" ? (
              <div className="my-3 w-full">
                <label
                  htmlFor={field?.fieldName}
                  className="text-xs text-gray-500"
                >
                  {field?.label}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white text-black">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="text-black"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ) : field.fieldType === "checkbox" ? (
              <div className="my-3 w-full flex items-center gap-4">
                {!field?.options && <Checkbox className="h-1 w-1" />}
                <label htmlFor={field?.label} className="text-xs text-gray-500">
                  {field?.label}
                </label>
                {field?.options &&
                  field.options.map((option, idx) => (
                    <div className="flex gap-2 items-center">
                      <Checkbox className="h-1 w-1" />
                      <h2>{option.label}</h2>
                    </div>
                  ))}
              </div>
            ) : field.fieldType === "textarea" ? (
              <div className="my-3 w-full">
                <label
                  htmlFor={field?.fieldName}
                  className="text-xs text-gray-500"
                >
                  {field?.label}
                </label>
                <Textarea
                  type={field?.fieldType}
                  name={field?.fieldName}
                  placeholder={field?.placeholder}
                />
              </div>
            ) : (
              <div className="my-3 w-full">
                <label
                  htmlFor={field?.fieldName}
                  className="text-xs text-gray-500"
                >
                  {field?.label}
                </label>
                <Input
                  type={field?.fieldType}
                  name={field?.fieldName}
                  placeholder={field?.placeholder}
                />
              </div>
            )}
            <div className="">
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFormUpdate(value, i)}
                deleteField={() => deleteField(i)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FormUi;
