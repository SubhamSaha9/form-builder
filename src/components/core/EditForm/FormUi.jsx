import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";

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
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FormUi = ({
  jsonForm,
  onFormUpdate,
  deleteField,
  selectedTheme,
  selectedStyle,
  editable,
}) => {
  const [date, setDate] = useState();
  const [formData, setFormData] = useState();
  const { token } = useSelector((state) => state.auth);
  const { formId } = useParams();
  let formRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hadleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];

    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    } else {
      const result = list.filter((item) => item.label == itemName);
      setFormData({
        ...formData,
        [fieldName]: result,
      });
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting form...");
    try {
      const { data } = await axios.post(
        `${BASE_URL}/forms/submit-form`,
        { formData: JSON.stringify(formData), formId: formId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      formRef.reset();
      toast.dismiss(toastId);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <form
      onSubmit={onFormSubmit}
      className="border p-5 md:w-[450px] rounded-lg"
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key == "boxshadow" && "5px 5px 0px black",
        border: selectedStyle?.key == "border" && selectedStyle.value,
      }}
    >
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
                <Select
                  required={field?.required}
                  onValueChange={(v) => hadleSelectChange(field.fieldName, v)}
                >
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
                <RadioGroup required={field?.required}>
                  {field?.options.map(
                    (option,
                    (idx) => (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.Label}
                          id={option.Label}
                          onClick={() =>
                            hadleSelectChange(field.fieldName, option.label)
                          }
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
                      onDayClick={(v) => hadleSelectChange(field.fieldName, v)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ) : field.fieldType === "checkbox" ? (
              <div className="my-3 w-full flex items-center gap-4">
                {!field?.options && (
                  <Checkbox
                    className="h-1 w-1"
                    onCheckedChange={(v) =>
                      handleCheckboxChange(field?.label, field?.label, v)
                    }
                  />
                )}
                <label htmlFor={field?.label} className="text-xs text-gray-500">
                  {field?.label}
                </label>
                {field?.options &&
                  field.options.map((option, idx) => (
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        className="h-1 w-1"
                        onCheckedChange={(v) =>
                          handleCheckboxChange(
                            field?.label,
                            option.label ? option.label : option,
                            v
                          )
                        }
                      />
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
                  required={field?.required}
                  onChange={(e) => handleInputChange(e)}
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
                  required={field?.required}
                  placeholder={field?.placeholder}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            )}
            {editable && (
              <div className="">
                <FieldEdit
                  defaultValue={field}
                  onUpdate={(value) => onFormUpdate(value, i)}
                  deleteField={() => deleteField(i)}
                />
              </div>
            )}
          </div>
        ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormUi;
